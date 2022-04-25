// import { Button, Form, Input } from 'antd';
import { Button, FormGroup as Form, FormControl, Input, TextField, InputLabel, InputAdornment, Avatar } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentText, userId: id, postId: post.id },
      });
    },
    [commentText, id]
  );

  return (
    <>
      <form>
        <Form style={{ position: 'relative', margin: 0 }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">댓글 달기</InputLabel>
            <Input
              sx={{ height: 50 }}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <Avatar sx={{ width: 35, height: 35, fontSize: 15, bgcolor: 'grey' }}>{me?.nickname[0]}</Avatar>
                </InputAdornment>
              }
              onChange={onChangeCommentText}
            />
            {addCommentLoading ? (
              <LoadingButton sx={{ position: 'absolute', right: 0, bottom: -40, zIndex: 2 }} loading variant="outlined">
                댓글
              </LoadingButton>
            ) : (
              <Button sx={{ position: 'absolute', right: 0, bottom: -40, zIndex: 2 }} onClick={onSubmitComment}>
                댓글
              </Button>
            )}
          </FormControl>
        </Form>
      </form>
    </>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
