import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'
import DemoButton from './AuthPageDemoBtn';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [backendErrors, setBackendErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    const valErrors = [];
    e.preventDefault();
    const emailCheck = validateEmail(email);
    const passwordCheck = password.trim().length !== 0;

    if (emailCheck && passwordCheck) {
      const data = await dispatch(login(email, password));
      if (data) {
        // setErrors(data);
        setBackendErrors(data);
        setSubmitted(!submitted)
      }
    }

    if (!emailCheck) {
      valErrors.push('Please provide a valid email.')
      setErrors([...valErrors])
      return
    }
    if (!passwordCheck) {
      valErrors.push('Please provide a password.')
      setErrors([...valErrors])
      return
    }
  };

  const validateEmail = (elementValue) => {
    // let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i;
    return emailPattern.test(elementValue);
  }

  useEffect(() => {
    const valErrors = [];
    backendErrors.forEach(err => {
      if (err === 'email : 1') valErrors.push('Email provided not found.')
      if (err === 'password : 3') valErrors.push('Incorrect password and email.')
    })
    setErrors(valErrors)
  }, [submitted])

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='login-page'>
      <div className='login-image'>
      </div>
      <div className='login-form'>
        <form className='login-form-inputs' onSubmit={onLogin}>
          <div className='login-form-title'>
            Log in to Sea
          </div>
          <div>
            <label className='login-email-input' htmlFor='email'>Email</label>
            <input
              className='login-email-form-field'
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label className='login-password-input' htmlFor='password'>Password</label>
            <input
              className='login-password-form-field'
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
            <div className='both-login-page-btns'>
              <button className='login-button' type='submit'>Log in</button>
              <DemoButton />
            </div>
          </div>
          <div className='login-form-signup-nav'>
            Don't have an account?<span> </span>
            <NavLink className='login-form-create-account' to='/sign-up'>Create an account</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
