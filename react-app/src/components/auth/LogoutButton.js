import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import {clearAllWatchList} from '../../store/watchlist'
import { useHistory } from 'react-router-dom';
import '../NavBar/navbar.css'

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearAllWatchList())
    history.push('/')
  };

  return <button id="logout-btn" onClick={
    onLogout
  }>Log Out</button>;
};

export default LogoutButton;
