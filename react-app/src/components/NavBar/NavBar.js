
import React from 'react';
import "./Navbar.css"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import LogoutButton from '../auth/LogoutButton';

// const NavBar = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to='/' exact={true} activeClassName='active'>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/login' exact={true} activeClassName='active'>
//             Login
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/sign-up' exact={true} activeClassName='active'>
//             Sign Up
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/users' exact={true} activeClassName='active'>
//             Users
//           </NavLink>
//         </li>
//         <li>
//           <LogoutButton />
//         </li>
//       </ul>
//     </nav>
//   );
// }

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  // Navbar looks different whether there is a user logged in or not
  if (sessionUser) {
    return (
      <div id="nli-navbar-main-container">
        <section id="nli-navbar-left">
          <NavLink id="nli-navlink" to="/">
            <section id="nli-navbar-reddit">
              <aside id="nli-navbar-reddit-logo">
                <i id="nli-navbar-reddit-logo" className="fa-brands fa-reddit fa-2xl"></i>
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
            <button id="nli-login">Log In</button>
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
    return (
      <div id="li-navbar-main-container">
        <section id="li-navbar-left">
          <NavLink to="/">
            <section id="li-navbar-reddit">
              <aside id="li-navbar-reddit-logo">
                <i id="li-navbar-reddit-logo" className="fa-brands fa-reddit-alien"></i>
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
          <section id="li-navbar-search-bar">
            <form action="/test">
              <input type="text" placeholder="Search..." name="search" />
            </form>
          </section>
        </section>
        <section id="li-navbar-right">
          right
        </section>
      </div>
    )
  }
}

export default NavBar;
