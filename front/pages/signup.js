import React, { useState, useCallback, useEffect } from 'react';
// import { Form, Input, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, TextField, Checkbox, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Router from 'next/router';

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
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(nick, email, password);

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
          nickname: nick,
        },
      });
    },
    [email, password, passwordCheck, term]
  );

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
            <h3 htmlFor="sign-up">????????????</h3>
            <div>
              <TextField email="ID" label="?????????" type="email" variant="standard" sx={{ width: '100%' }} value={email} onChange={onChangeEmail} />
            </div>
            <div>
              <TextField email="nickname" label="?????????" variant="standard" sx={{ width: '100%' }} value={nick} onChange={onChangeNick} />
            </div>
            <div>
              <TextField
                email="password"
                label="????????????"
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
                label="???????????? ??????"
                variant="standard"
                sx={{ width: '100%' }}
                type="password"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              {passwordError && <div style={{ color: 'red' }}>??????????????? ???????????? ????????????.</div>}
            </div>
            <div>
              <label>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm} />
                <span>gnncjegrgr??? ?????? ??? ?????? ?????? ???????????????.</span>
              </label>
              {termError && <div style={{ color: 'red' }}>????????? ??????????????? ?????????.</div>}
            </div>
            <div style={{ marginTop: 10 }}>
              <Button type="primary" onClick={onSubmit}>
                ????????????
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
