import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/Modals/LoginFormModal/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import SignUpForm from './components/Modals/SignUpModal/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/Users/UsersList/UsersList';
import User from './components/Users/Users/User';
import LandingPage from './components/LandingPage/LandingPage';
import { authenticate } from './store/session';

import SubredditPage from './components/SubredditPage';
import CreatePostPage from './components/CreatePostPage';

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
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/r/:subreddit_name/new">
          <CreatePostPage />
        </Route>
        <Route path="/r/">
          <SubredditPage />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
