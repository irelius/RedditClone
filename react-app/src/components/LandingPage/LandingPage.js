import "./LandingPage.css"

import LPLoggedIn from "./LPLoggedIn";
import LPNotLoggedIn from "./LPNotLoggedIn/LPNotLoggedIn";
import { useSelector } from "react-redux";

import AllPosts from "../Post/AllPosts/AllPosts";
import SubredditsBar from "../SubredditsBar/SubredditsBar";

const LandingPage = () => {
    return (
        <div id="landing-page-main-container">
            <aside id="landing-page-posts-container">
                <AllPosts />
            </aside>
            <aside id="landing-page-subreddit-bar-container">
                <SubredditsBar />
            </aside>
        </div>
    )
}

export default LandingPage
