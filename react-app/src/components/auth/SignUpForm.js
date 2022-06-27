import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='signup-page'>
      <div className='signup-image'>
        <img className='surfing-lady-image' src='https://www.marcuslemonis.com/wp-content/uploads/2020/10/surfing-money-wave-600x600.jpg'></img>
      </div>
      <div className='signup-form'>
        <form onSubmit={onSignUp}>
          <div className='signup-form-intro'>
            Enter your first and last name as they appear on your government ID.
          </div>
          <div className='signup-form-first-last-name-container'>
            <input
              type='text'
              name='first_name'
              className='signup-first-name-form-field'
              onChange={updateFirstName}
              placeholder='  First Name'
              value={first_name}
            ></input>
            <input
              type='text'
              name='last_name'
              className='signup-last-name-form-field'
              onChange={updateLastName}
              placeholder='  Last Name'
              value={last_name}
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='email'
              className='signup-email-form-field'
              onChange={updateEmail}
              placeholder='  Email Address'
              value={email}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              className='signup-password-form-field'
              onChange={updatePassword}
              placeholder='  Password'
              value={password}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              className='signup-confirm-password-form-field'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder='  Confirm Password'
              required={true}
            ></input>
          </div>
          <div className='signup-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='signup-already-started-text'>
            Already started?
            <div>
              <NavLink className='nav-link-login' to='/login'>
                Log in to continue.
              </NavLink>
            </div>
          </div>
          <div className='signup-disclaimer-text'>
            By signing up, you agree that this is for fun and should NOT be used for real financial purposes.
          </div>
          <button className='signup-form-button' type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
