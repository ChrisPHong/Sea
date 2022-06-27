import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashPage from './components/SplashPage';
import Footer from './components/Footer';
import NavBar from './components/NavBar/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Dashboard from './components/Dashboard'
import { authenticate } from './store/session';
import WatchlistPage from './components/Watchlist';
import WatchlistForm from './components/WatchlistForm';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <SplashPage />
          <Footer />
        </Route>
        <ProtectedRoute path='/dashboard'>
          <Dashboard />
          <WatchlistPage />
            <WatchlistForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
