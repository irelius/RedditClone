
import React from 'react';
import "./Navbar.css"
import { NavLink } from 'react-router-dom';
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
  return (
    <div id="navbar-main-container">
      <section id="navbar-left">
        <NavLink to="/">
          <section id="navbar-reddit">
            <aside id="navbar-reddit-logo-aside">
              <i id="navbar-reddit-logo" className="fa-brands fa-reddit-alien"></i>
            </aside>
            <aside id="navbar-reddit-text">
              reddit
            </aside>
          </section>
        </NavLink>
        {/* TO DO: Drop down menu to select Home, Popular, or specific Subreddit communities */}
        {/* <aside>

        </aside> */}
      </section>
      <section id="navbar-middle">

      </section>
      <section id="navbar-right">

      </section>
    </div>

  )
}

export default NavBar;
