
import React from 'react';
import "./Navbar.css"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../Modals/LoginFormModal';
// import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  console.log("")
  console.log(sessionUser, "sessionUser")
  console.log("")


  let sessionLinks;
  // Navbar looks different whether there is a user logged in or not
  if (!sessionUser) {
    sessionLinks = (
      <div id="nli-navbar-main-container">
        <section id="nli-navbar-left">
          <NavLink id="nli-navlink" to="/">
            <section id="nli-navbar-reddit-container">
              <aside id="nli-navbar-reddit-logo-container">
                <section id="nli-navbar-reddit-circle">
                  <i id="nli-navbar-reddit-logo" className="fa-brands fa-reddit-alien fa-xl"></i>
                </section>
              </aside>
              <aside id="nli-navbar-reddit-text">
                reddit
              </aside>
            </section>
          </NavLink>
          {/* TO DO: Drop down menu to select Home, Popular, or specific Subreddit communities */}
          {/* <aside>
          </aside> */}
        </section>

        <section id="nli-navbar-middle">
          <section id="nli-navbar-search-bar-container">
            <form action="/test">
              <input id="nli-navbar-search-bar" type="text" placeholder="Search Reddit" name="search" />
            </form>
          </section>
        </section>

        <section id="nli-navbar-right">
          <aside id="nli-right-buttons">
            <button id="nli-signup">Sign Up</button>
          </aside>
          <aside id="nli-right-buttons">
            <LoginFormModal />
          </aside>
          {/* TO DO: Bonus function of other options, like Dark Mode */}
          {/* <aside>
            <ul>
              <li>

              </li>
            </ul>
          </aside> */}
        </section>

      </div>
    )
  } else {
    sessionLinks = (
      <div id="li-navbar-main-container">
        <section id="li-navbar-left">
          <NavLink id="li-navlink" to="/">
            <section id="li-navbar-reddit-container">
              <aside id="li-navbar-reddit-logo-container">
                <section id="li-navbar-reddit-circle">
                  <i id="li-navbar-reddit-logo" className="fa-brands fa-reddit-alien"></i>
                </section>
              </aside>
              <aside id="li-navbar-reddit-text">
                reddit
              </aside>
            </section>
          </NavLink>
          {/* TO DO: Drop down menu to select Home, Popular, or specific Subreddit communities */}
          {/* <aside>
          </aside> */}
        </section>

        <section id="li-navbar-middle">
          <section id="li-navbar-search-bar-container">
            <form action="/test">
              <input id="li-navbar-search-bar" type="text" placeholder="Search..." name="search" />
            </form>
          </section>
        </section>


        {/* TO DO: After setting up the login method */}
        <section id="li-navbar-right">
          right
        </section>
      </div>
    )
  }


  return (
    <div>
      {sessionLinks}
    </div>
  )
}

export default NavBar;
