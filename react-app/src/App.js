import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';

import LoginForm from './components/Modals/LoginModal/LoginForm';
import SignUpForm from './components/Modals/SignUpModal/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import UsersPage from './components/Users/UsersPage';
import LandingPage from './components/LandingPage/LandingPage';

import SubredditPage from './components/SubredditPage';
import CreatePostPage from './components/CreatePostPage';
import OnePost from './components/Post/OnePost';
import ErrorPage from './components/ErrorPage';

// import TestPage from './components/TestPage/TestPage';

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
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/users/:username' exact={true} >
          <UsersPage />
        </Route>
        <Route path="/r/:subreddit_name/new" exact={true}>
          <CreatePostPage />
        </Route>
        <Route path="/r/:subreddit_name/:post_id" exact={true}>
          <OnePost />
        </Route>
        <Route path="/r/:subreddit_name" exact={true}>
          <SubredditPage />
        </Route>
        {/* <Route path="/test">
          <TestPage />
        </Route> */}
        <Route path="">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
