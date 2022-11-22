import "./Navbar.css"

import React from 'react';
import { useSelector } from 'react-redux';

import NavBarNotLoggedIn from './NavBarComponents/NavBarNotLoggedIn';
import NavBarLoggedIn from './NavBarComponents/NavBarLoggedIn/NavBarLoggedIn';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  // Navbar looks different whether there is a user logged in or not
  // If there is a session user, meaning user is logged in
  if (!sessionUser) {
    return (
      <NavBarNotLoggedIn />
    )

    // There is no session user, meaning user is not logged in
  } else {
    return (
      <NavBarLoggedIn />
    )
  }
}

export default NavBar
