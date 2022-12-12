import "./ProfileMenuModal.css"

import * as sessionActions from "../../../store/session"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import SubredditCreateModal from "../SubredditCreateModal";

const ProfileMenuModal = ({setShowProfileMenu}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)

    // Redirect to User's Profile page
    const profileRedirect = (e) => {
        e.preventDefault()
        setShowProfileMenu(false)
        history.push(`/users/${currentUser.username}`)
    }

    // Handle Logout
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
        return <Redirect to="/" />
    }

    return (
        <section id="li-navbar-right">
            <section id="li-navbar-right-part-one">
                <aside id="navbar-profile-icon">
                    <i className="fa-regular fa-user" />
                </aside>
                <aside id="navbar-profile-name">
                    My Stuff
                </aside>
            </section>
            <section id="navbar-right-profile" onClick={profileRedirect}>
                Profile
            </section>
            {/* TO DO, implement function to turn on dark mode and not */}
            {/* <section id="li-navbar-right-part-two">
                View Options
                <li>Dark Mode</li>
            </section> */}
            <section id="li-navbar-right-part-three">
                <aside id="navbar-community-icon">
                    <i className="fa-brands fa-ravelry" />
                </aside>
                <aside id="navbar-right-community">
                    <SubredditCreateModal setShowProfileMenu={setShowProfileMenu}/>
                </aside>
            </section>
            <section id="li-navbar-right-part-four" onClick={handleLogout}>
                <aside id="navbar-logout-icon">
                    <i className="fa-solid fa-arrow-right-from-bracket" />
                </aside>
                <aside id="navbar-right-logout">Logout</aside>
            </section>
            <section id="li-navbar-footer">
                2022 Reddit, Clone.
            </section>
        </section>
    )
}

export default ProfileMenuModal
