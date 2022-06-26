import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Sea
          </NavLink>
        </li>
        {currentUser
        ?
          <li>
            <LogoutButton />
          </li>
        :
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
