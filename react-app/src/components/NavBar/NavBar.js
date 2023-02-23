import "./Navbar.css"

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import NavBarProfileMenu from "./NavBarComponents/NavBarProfileMenu/NavBarProfileMenu";
import LoginModal from "../Modals/LoginModal";
import SignUpFormModal from "../Modals/SignUpModal";

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()

  const [searchInput, setSearchInput] = useState("")

  const goToSearch = (e) => {
    e.preventDefault()
    setSearchInput("")
    if (searchInput === "") {
      return
    }
    history.push(`/search/${searchInput}`)
    e.target.reset()
  }

  return (
    <div id="navbar-main-container">
      <section id="navbar-left-section">
        <NavLink id="navbar-navlink" to="/">
          <section id="navbar-reddit-container">
            <aside id="navbar-reddit-logo-container">
              <i id="navbar-reddit-logo" className="fa-solid fa-glasses" />
            </aside>
            <aside id="navbar-reddit-text">
              readdit
            </aside>
          </section>
        </NavLink>
        <section>
          <aside id="navbar-about-links">
            <section id="navbar-about-links-github" onClick={() => { return window.open("https://github.com/irelius/RedditClone") }}>
              <i id="navbar-github-icon" className="fa-brands fa-github fa-lg" />
            </section>
            <section id="navbar-about-links-linkedin" onClick={() => { return window.open("https://www.linkedin.com/in/sbkihongbae/") }}>
              <i id="navbar-linked-icon" className="fa-brands fa-linkedin fa-lg" />
            </section>
          </aside>
        </section>
        {/* TO DO: Drop down menu to select Home, Popular, or specific Subreddit communities */}
      </section>

      <section id="navbar-middle">
        <section id="navbar-search-bar-container">
          <form onSubmit={(e) => { goToSearch(e) }}>
            <input
              id="navbar-search-bar"
              type="text"
              placeholder="Search Readdit"
              onChange={(e) => { setSearchInput(e.target.value) }}
              name="search"
              minLength={1}
            />
          </form>
        </section>
      </section>

      {/* <section id="navbar-middle">
        <section id="navbar-search-bar-container">
          <i id="navbar-search-bar-magnifying-glass" className="fa-solid fa-magnifying-glass" />
          <form id="test" onSubmit={(e) => { goToSearch(e) }}>
            <input
              id="navbar-search-bar"
              type="text"
              placeholder="Search Readdit"
              onChange={(e) => { setSearchInput(e.target.value) }}
              name="search"
              minLength={1}
            />
          </form>
        </section>
      </section> */}

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
            <LoginModal />
          </aside>
        </div>
      )}
    </div>
  )

}

export default NavBar
