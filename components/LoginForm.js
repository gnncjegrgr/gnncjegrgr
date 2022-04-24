import React, { useCallback } from 'react';
// import { Button, Form, Input } from 'antd';
import { Button, TextField, FormGroup as Form, Input, Grid, Box } from '@mui/material';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        loginAction({
          id,
          password,
        })
      );
    },
    [id, password]
  );

  return (
    <form style={{ padding: '10px', display: 'flex', marginLeft: '5%' }}>
      <Card>
        <Box component="div" sx={{ p: 2 }}>
          <div>
            <TextField label="ID" value={id} onChange={onChangeId} required variant="outlined" size="small" sx={{ width: '95%' }} />
          </div>
          <br />
          <div>
            <TextField label="password" value={password} onChange={onChangePassword} type="password" required size="small" sx={{ width: '95%' }} />
          </div>
        </Box>
        <div style={{ marginTop: '10px', marginLeft: '3%' }}>
          <CardActions>
            <Button type="primary" onClick={onSubmitForm}>
              로그인
            </Button>
            <Link href="/signup">
              <a>
                <Button>회원가입</Button>
              </a>
            </Link>
          </CardActions>
        </div>
      </Card>
    </form>
  );
};

export default LoginForm;
