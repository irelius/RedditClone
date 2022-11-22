import "./NavBarNotLoggedIn.css"

import { NavLink } from 'react-router-dom';
import LoginFormModal from '../../../Modals/LoginFormModal';


const NavBarNotLoggedIn = () => {
    return (
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
}

export default NavBarNotLoggedIn
