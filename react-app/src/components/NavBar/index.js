import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../SearchBar';
// import { getStocks } from '../../store/stock';
import './navbar.css'

const NavBar = () => {
  // const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const stock = useSelector(state => state?.stock?.entries)


  // useEffect(() => {
  //   dispatch(getStocks())
  // }, [dispatch])

  return (
    <nav className='nav-bar'>

      {currentUser
      ?
        <>
          <div className='sea-navbar-logo'>
            <NavLink to='/dashboard' exact={true} activeClassName='active'>
              Sea
            </NavLink>
          </div>

          <div className='auth-navbar-right'>
            { stock && (
              <SearchBar />
            )}

            <div id="nav-portfolio">
              <NavLink to='/dashboard' exact={true} activeClassName='active'>
                Portfolio
              </NavLink>
            </div>

            <div id="nav-transactions">
              <NavLink to='/transactions' exact={true} activeClassName='active'>
                Transactions
              </NavLink>
            </div>

            <LogoutButton />
          </div>
        </>
      :
        <>
          <div className='sea-navbar-logo'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Sea
            </NavLink>
          </div>
          <div className='navbar-right'>
            <div id="nav-login">
              <NavLink to="/login" exact={true} >
                Log In
              </NavLink>
            </div>
            <div id="nav-signup">
              <NavLink to="/sign-up" exact={true} >
                Sign Up
              </NavLink>
            </div>
          </div>
        </>
      }
    </nav>
  );
}

export default NavBar;
