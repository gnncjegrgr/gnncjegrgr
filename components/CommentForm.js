// import { Button, Form, Input } from 'antd';
import { Button, FormGroup as Form, FormControl, Input, TextField, InputLabel, InputAdornment, Avatar } from '@mui/material';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import AccountCircle from '@mui/icons-material/AccountCircle';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState('');

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      console.log(commentText);
    },
    [commentText]
  );

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

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
                  <Avatar sx={{ width: 35, height: 35, fontSize: 15, bgcolor: 'grey' }}>M</Avatar>
                </InputAdornment>
              }
              onChange={onChangeCommentText}
            />
            <Button sx={{ position: 'absolute', right: 0, bottom: -40, zIndex: 2 }} onClick={onSubmitComment}>
              댓글
            </Button>
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
