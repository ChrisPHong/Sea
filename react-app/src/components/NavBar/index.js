import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../SearchBar';
import './navbar.css'

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <nav className='nav-bar'>

      <div className='sea-navbar-logo'>
        Sea
      </div>

      {currentUser
      ?
        <div className='auth-navbar-right'>

          <div>
            <SearchBar />
          </div>

          <div id="nav-portfolio">
            <NavLink to='/dashboard-xyz' exact={true} activeClassName='active'>
              Portfolio
            </NavLink>
          </div>

          <div id="nav-transactions">
            <NavLink to='/transactions-xyz' exact={true} activeClassName='active'>
              Transactions
            </NavLink>
          </div>

          <LogoutButton />
        </div>
      :
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
      }
    </nav>
  );
}

export default NavBar;
