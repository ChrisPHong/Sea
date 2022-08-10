import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'
import DemoButton from './AuthPageDemoBtn';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [backendErrors, setBackendErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    const valErrors = [];
    e.preventDefault();

    const firstNameCheck = firstName.trim().length !== 0;
    const lastNameCheck = lastName.trim().length !== 0;
    const emailCheck = validateEmail(email);
    const passwordCheck = password.trim().length !== 0;
    const passwordMatchCheck = (password === repeatPassword);

    if (firstNameCheck && lastNameCheck && passwordCheck && passwordMatchCheck && emailCheck) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setBackendErrors(data)
        setSubmitted(!submitted)
      }
    }
    if (!firstNameCheck) {
      valErrors.push('Please provide a first name.')
      setErrors([...valErrors])
      return
    }
    if (!lastNameCheck) {
      valErrors.push('Please provide a last name.')
      setErrors([...valErrors])
      return
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
    if (!passwordMatchCheck) valErrors.push('Password and Repeat Password fields do not match.');
    setErrors([...valErrors])
  };

  useEffect(() => {
    const valErrors = [];
    if (backendErrors[0]) valErrors.push('There is already an account associated with this email.');
    setErrors(valErrors)
    // console.log(backendErrors)
  }, [submitted])

  useEffect(() => {
    const lengthErrors = []

    if (firstName.length === 20) {
      lengthErrors.push('Please keep first name to under 20 characters')
    }
    if (lastName.length === 20) {
      lengthErrors.push('Please keep last name to under 20 characters')
    }

    if (lengthErrors.length) setErrors(lengthErrors)
    else return () => setErrors([]);
  }, [firstName, lastName, email, password, repeatPassword])

  const validateEmail = (elementValue) => {
    // let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i;
    return emailPattern.test(elementValue);
  }

  const updateFirstName = (e) => {
    // console.log(e.target.value)
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
              name='firstName'
              className='signup-first-name-form-field'
              onChange={updateFirstName}
              placeholder='First Name'
              value={firstName}
              required={true}
            ></input>
            <input
              type='text'
              name='lastName'
              className='signup-last-name-form-field'
              onChange={updateLastName}
              placeholder='Last Name'
              value={lastName}
              required={true}
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='email'
              className='signup-email-form-field'
              onChange={updateEmail}
              placeholder='Email Address'
              value={email}
              required={true}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              className='signup-password-form-field'
              onChange={updatePassword}
              placeholder='Password'
              value={password}
              required={true}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              className='signup-confirm-password-form-field'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder='Confirm Password'
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
          <div className='both-signup-page-btns'>
            <button className='signup-form-button' type='submit'>Sign Up</button>
            {/* <DemoButton /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
