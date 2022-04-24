import React, { useCallback } from 'react';
// import { Button, Form, Input } from 'antd';
import { Button, TextField, FormGroup as Form, Input, Grid, Box } from '@mui/material';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: { email, password },
      });
    },
    [email, password]
  );

  return (
    <form style={{ padding: '10px', display: 'flex', marginLeft: '5%' }}>
      <Card>
        <Box component="div" sx={{ p: 2 }}>
          <div>
            <TextField label="ID" value={email} onChange={onChangeEmail} required variant="outlined" type="email" size="small" sx={{ width: '95%' }} />
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
