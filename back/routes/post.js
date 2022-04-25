const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g); // 해시태그를 포함하였는지 content에서 확인해줍니다.
    const post = await Post.create({
      // 해당 post를 만들어 줍니다.
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      // 만약 해시태그가 있다면
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            // 해시태그들에 대하여 db에 없다면 hashtag테이블에 추가하고 있다면 가져옵니다.
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); // [[노드, true], [리액트, true]]
      await post.addHashtags(result.map((v) => v[0])); // post에 findOrCreate한 hashtag들을 추가해줍니다.
      //result는 위와 같이 이중 배열로 되어있으며, 첫번째 요소는 해시태그 이름, 두번째 요소는 가져온 것인지 아니면 새로 만든 것인지를 나타내줍니다.
    }
    if (req.body.image) {
      // 만약 이미지가 있는 경우에는
      if (Array.isArray(req.body.image)) {
        // 배열인 경우
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {
        // 아닌 경우

        const image = await Image.create({ src: req.body.iamge });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image, // 게시글 이미지
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  // postId에 대하여 Retweet을 하는 경우
  try {
    const post = await Post.findOne({
      // postId에 해당하는 게시물을 찾아줍니다.
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id; // RetweetId가 있다면 retweetTargetId는 post.RetweetId가 되고, 아니라면 post.id가 RetweetId가 됩니다.
    const exPost = await Post.findOne({
      // 내가 쓴글이면서 RetweetId가 retweetTargetId인 게시글을 찾아줍니다.
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      // 이미 있다면 리트윗할 수 없습니다.
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await Post.create({
      // 만약 없다면 만들어 줍니다.
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      // 그리고 포스트에 대한 전체 내용을 가져와 줍니다.
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  // POST /post/1/comment

  try {
    const post = await Post.findOne({
      // postId인 post에 대하여 댓글을 작성해줍니다.
      where: { id: req.params.postId },
    });
    if (!post) {
      // 없는 게시글에 대해서는 댓글을 작성해줄 수 없습니다.
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    // comment를 만들어 줍니다.
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    // 위의 comment에 대하여 필요한 정보를 가져와줍니다.
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });

    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
