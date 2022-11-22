import "./NavBarLoggedIn.css"

import { NavLink } from 'react-router-dom';
import NavBarProfileMenu from "../NavBarProfileMenu/NavBarProfileMenu";
// import ProfileModal

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
                <p>
                  reddit
                </p>
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


        <section>
          <NavBarProfileMenu />
        </section>
      </div>
    )
}

export default NavBarLoggedIn;
