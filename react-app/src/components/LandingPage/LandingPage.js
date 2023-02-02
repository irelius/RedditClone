import "./LandingPage.css"

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
