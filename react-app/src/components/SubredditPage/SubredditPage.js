import "./SubredditPage.css"

import SubredditPagePosts from "./SubredditPageComponents/SubredditPosts"
import SubredditPageBar from "./SubredditPageComponents/SubredditPageBar/SubredditPageBar"


const SubredditPage = () => {
    return (
        <div id="subreddit-page-main-container">
            <aside id="subreddit-page-posts-main-container">
                <SubredditPagePosts />
            </aside>
            <aside id="subreddit-page-bar-main-container">
                <SubredditPageBar />
            </aside>
        </div>
    )


}

export default SubredditPage
