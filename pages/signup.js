import React, { useState, useCallback } from 'react';
// import { Form, Input, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, TextField, Checkbox, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SIGN_UP_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const Item = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: '10%',
  marginLeft: '10%',
  marginRight: '10%',
}));

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');

  const dispatch = useDispatch();
  const { isSigninUp, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      alert('로그인했으니 메인페이지로 이동합니다.');
      Router.push('/');
    }
  }, [me && me.id]);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nick,
      },
    });
  }, [email, password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <AppLayout>
      <form style={{ padding: 10 }}>
        <Paper>
          <Item>
            <h3 htmlFor="sign-up">회원가입</h3>
            <div>
              <TextField email="ID" label="아이디" variant="standard" sx={{ width: '100%' }} value={email} onChange={onChangeEmail} />
            </div>
            <div>
              <TextField email="nickname" label="닉네임" variant="standard" sx={{ width: '100%' }} value={nick} onChange={onChangeNick} />
            </div>
            <div>
              <TextField
                email="password"
                label="비밀번호"
                variant="standard"
                sx={{ width: '100%' }}
                type="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div>
              <TextField
                email="password-check"
                label="비밀번호 체크"
                variant="standard"
                sx={{ width: '100%' }}
                type="password"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
            </div>
            <div>
              <label>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm} />
                <span>gnncjegrgr의 말을 잘 들을 것을 동의합니다.</span>
              </label>
              {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
            </div>
            <div style={{ marginTop: 10 }}>
              <Button type="primary" onClick={onSubmit}>
                가입하기
              </Button>
            </div>
            <br />
          </Item>
        </Paper>
      </form>
    </AppLayout>
  );
};

export default Signup;
