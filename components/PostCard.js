import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Avatar,
  Popover,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import FollowButton from './FollowButton';
import LoopIcon from '@mui/icons-material/Loop';
import Item from 'antd/lib/list/Item';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const id = useSelector((state) => state.user.me && state.user.me.id);

  const [liked, setLiked] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card sx={{ width: '100%', marginBottom: '5%', paddingBottom: '2%' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#000' }}>{post.User.nickname[0]}</Avatar>}
        action={
          <>
            <FollowButton post={post} />
            <IconButton aria-label="settings">
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Popover id="more-icon" open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <br />
                    <Button>삭제</Button>
                  </>
                ) : (
                  <Button color="error">신고</Button>
                )}
              </Popover>
            </IconButton>
          </>
        }
        title={post.User.nickname}
        // subheader={post.createdAt}
      />
      <CardMedia>{post.Images[0] && <PostImages images={post.Images} />}</CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <PostCardContent postData={post.content} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LoopIcon />
        </IconButton>
        <IconButton aria-label="like" onClick={() => setLiked(!liked)}>
          {liked ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteIcon />}
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentForm post={post} />
          <br />
          {post.Comments?.map((el, idx) => (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} key={idx}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Link href={{ pathname: '/user', query: { id: el.User.id } }} as={`/user${el.User.id}`}>
                    <a>
                      <Avatar alt="Remy Sharp">{el.User.nickname[0]}</Avatar>
                    </a>
                  </Link>
                </ListItemAvatar>
                <ListItemText primary={el.User.nickname} secondary={<React.Fragment>{el.content}</React.Fragment>} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
