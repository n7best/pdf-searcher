import React, { useState, useCallback } from 'react';
import { css } from "emotion";
import { Redirect } from 'react-router-dom'
import useAuth from 'Hooks/useAuth';
import classNames from 'classnames';
import Input from 'Components/Input';
import { login } from 'Actions/auth';
import {useDispatch} from 'redux-react-hook';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { user, message } = useAuth();

  const dispatch = useDispatch();
  const loginHandler = useCallback(() => {
    if(invalid) return;
    dispatch(login(form.email, form.password))
  })

  if(user) return <Redirect to="/dashboard" />;

  const invalid = !form.email || !form.password;

  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        <p className={styles.title}>Sign In</p>
        <div>
          {
            message && <div className={styles.message}>{message}</div>
          }
          <Input 
            value={form.email}
            type="text"
            placeholder="Email Address"
            onChange={value => setForm(form => ({ ...form, email: value}))}  
          />
          <Input 
            value={form.password}
            type="password"
            placeholder="Password"
            onChange={value => setForm(form => ({ ...form, password: value}))}  
          />
          <button 
            className={classNames(styles.button, {
              'disable': invalid
            })}
            onClick={loginHandler}
          >Sign In</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  loginWrapper: css`
    height: 400px;
    width: 400px;
    text-align: center;
  `,
  title: css`
    font-size: 42px;
    width: 100%;
  `,
  message: css`
    padding: 10px 20px;
    border: 1px solid red;
    color: #000;
    margin: 20px 0;
    background: #ffdfdf;
  `,
  button: css`
    margin: 20px 0;
    background: rgb(57,171,209);
    border: 1px solid #ccc;
    width: 100%;
    padding: 20px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;

    &.disable {
      background: #ccc;
      cursor: not-allowed;
    }
  `
}

export default Login