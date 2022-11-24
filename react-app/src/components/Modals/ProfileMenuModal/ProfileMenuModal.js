import "./ProfileMenuModal.css"

import * as sessionActions from "../../../store/session"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router-dom";


const ProfileMenuModal = () => {
    const dispatch = useDispatch()

    // Redirect to User's Profile page
    const profileRedirect = (e) => {
        console.log("")
        console.log("profile redirect")
        console.log("")
        e.preventDefault()
        return Redirect("/users/:userId")
    }

    // Redirect to Create a Subreddit Page
    const createSubreddit = (e) => {
        console.log("")
        console.log("create subreddit")
        console.log("")
        e.preventDefault()
        return Redirect("/subreddits")
    }

    // Handle Logout
    const handleLogout = (e) => {
        console.log("")
        console.log("")
        console.log("")
        e.preventDefault()
        dispatch(sessionActions.logout())
        return Redirect("/")
    }

    return (
        <section id="li-navbar-right">
            <section id="li-navbar-right-part-one">
                <aside>My Stuff</aside>
                <ul>
                    <li onClick={profileRedirect}>Profile</li>
                </ul>
            </section>
            {/* TO DO, implement function to turn on dark mode and not */}
            {/* <section id="li-navbar-right-part-two">
                View Options
                <li>Dark Mode</li>
            </section> */}
            <section id="li-navbar-right-part-three">
                <ul>
                    <li onClick={createSubreddit}>Create a Community</li>
                </ul>
            </section>
            <section id="li-navbar-right-part-four">
                <ul>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </section>
        </section>
    )
}

export default ProfileMenuModal
