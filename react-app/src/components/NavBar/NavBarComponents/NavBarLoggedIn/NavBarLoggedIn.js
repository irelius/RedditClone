import "./NavBarLoggedIn.css"

import { NavLink } from 'react-router-dom';
import NavBarProfileMenu from "../NavBarProfileMenu/NavBarProfileMenu";

const NavBarLoggedIn = () => {

  return (
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
            <aside id="li-navbar-about-links">
              <NavLink id="li-navbar-about-links-github" to="/" onClick={() => {
                return window.open("https://github.com/irelius/RedditClone")
              }}>
                <i id="li-navbar-github-icon" className="fa-brands fa-github fa-lg" />
              </NavLink>
              <NavLink id="li-navbar-about-links-linkedin" to="/" onClick={() => {
                return window.open("https://www.linkedin.com/in/sbkihongbae/")
              }}>
                <i id="li-navbar-linked-icon" className="fa-brands fa-linkedin fa-lg" />
              </NavLink>
            </aside>
          </section>
        </NavLink>
        {/* TO DO: Drop down menu to select Home, Popular, or specific Subreddit communities */}
        {/* <aside>
          </aside> */}
      </section>

      {/* COMMENT IN: Navbar search function */}
      <section id="li-navbar-middle">
        {/* <section id="li-navbar-search-bar-container">
          <form>
            <input id="li-navbar-search-bar" type="text" placeholder="Search..." name="search" />
          </form>
        </section> */}
      </section>


      <section>
        <NavBarProfileMenu />
      </section>
    </div>
  )
}

export default NavBarLoggedIn;
