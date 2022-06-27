import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <div className='login-image'>
      </div>
      <div className='login-form'>
        <form className='login-form-inputs' onSubmit={onLogin}>
          <div className='login-form-title'>
            Log in to SeaCoin
          </div>
          <div>
            <label className='login-email-input' htmlFor='email'>Email</label>
            <input
              className='email-form-field'
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label className='login-password-input' htmlFor='password'>Password</label>
            <input
              className='password-form-field'
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
            <div className='login-form-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <button className='login-button' type='submit'>Log in</button>
          </div>
          <div className='login-form-signup-nav'>
            Don't have an account?
            <NavLink className='login-form-create-account' to='/sign-up'>Create an account</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
