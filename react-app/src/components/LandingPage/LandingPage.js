import "./LandingPage.css"

import PostsAll from "../PostsAll";
import SubredditsBar from "../SubredditsBar/SubredditsBar";

const LandingPage = () => {
    return (
        <div id="landing-page-main-container">
            <aside id="landing-page-posts-container">
                <PostsAll />
            </aside>
            <aside id="landing-page-subreddit-bar-container">
                <SubredditsBar />
            </aside>
        </div>
    )
}

export default LandingPage
