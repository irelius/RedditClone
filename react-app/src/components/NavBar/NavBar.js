import "./Navbar.css"

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NavBarProfileMenu from "./NavBarComponents/NavBarProfileMenu/NavBarProfileMenu";
import LoginFormModal from "../Modals/LoginFormModal";
import SignUpFormModal from "../Modals/SignUpModal";

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div id="navbar-main-container">
      <section id="navbar-left-section">
        <NavLink id="navbar-navlink" to="/">
          <section id="navbar-reddit-container">
            <aside id="navbar-reddit-logo-container">
              <section id="li-navbar-reddit-circle">
                <i id="navbar-reddit-logo" className="fa-brands fa-reddit-alien"></i>
              </section>
            </aside>
            <aside id="navbar-reddit-text">
              readdit
            </aside>
            <aside id="navbar-about-links">
              <NavLink id="navbar-about-links-github" to="/" onClick={() => {
                return window.open("https://github.com/irelius/RedditClone")
              }}>
                <i id="navbar-github-icon" className="fa-brands fa-github fa-lg" />
              </NavLink>
              <NavLink id="navbar-about-links-linkedin" to="/" onClick={() => {
                return window.open("https://www.linkedin.com/in/sbkihongbae/")
              }}>
                <i id="navbar-linked-icon" className="fa-brands fa-linkedin fa-lg" />
              </NavLink>
            </aside>
          </section>
        </NavLink>
        {/* TO DO: Drop down menu to select Home, Popular, or specific Subreddit communities */}
        {/* <aside>
        </aside> */}
      </section>

      <section id="navbar-middle">
        {/* <section id="navbar-search-bar-container">
          <form>
            <input id="navbar-search-bar" type="text" placeholder="Search..." name="search" />
          </form>
        </section> */}
      </section>

      {sessionUser ? (
        <div>
          <NavBarProfileMenu />
        </div>
      ) : (
        <div id="navbar-right">
          <aside id="navbar-right-button-signup">
            <SignUpFormModal />
          </aside>
          <aside id="navbar-right-button-login">
            <LoginFormModal />
          </aside>
        </div>
      )}
    </div>
  )

}

export default NavBar
