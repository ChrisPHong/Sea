import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/index'
import SplashPage from './components/SplashPage';
import Footer from './components/Footer';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

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
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {!user && (
          <Route path='/' exact={true} >
            <NavBar />
            <SplashPage />
            <Footer />
          </Route>
        )}
        {user && (
        <Route path='/' exact={true} >
          <NavBar />
          {/* <DashBoard user={user}/> */}
        </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
