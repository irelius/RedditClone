import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Users/UsersList/UsersList';
import User from './components/Users/Users/User';
import LPNotLoggedIn from './components/LandingPage/LPNotLoggedIn/LPNotLoggedIn';
import LPLoggedIn from './components/LandingPage/LPLoggedIn';
import { authenticate } from './store/session';

import Test from "./components/Test"

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
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
        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <LPNotLoggedIn />
        </Route>
        <Route path='/test' exact={true}>
          <Test />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
