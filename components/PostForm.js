import React, { useCallback, useRef, useEffect, useState } from 'react';
// import { Form, Input, Button } from 'antd';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, postAdded } = useSelector((state) => state.post);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  useEffect(() => {
    if (postAdded) {
      setText('');
    }
  }, [postAdded]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(addPost);
  }, []);

  return (
    <form style={{ margin: '10px 0 20px' }} encType="multipart/form-data">
      <TextField
        id="outlined-textarea"
        label="글쓰기"
        placeholder="오늘은 어떤 일이 있었나요?"
        multiline
        sx={{ width: '100%' }}
        value={text}
        onChange={onChangeText}
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} onClick={onSubmit}>
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default PostForm;
