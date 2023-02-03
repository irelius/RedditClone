import "./SubredditPage.css"

import SubredditPageBanner from "./SubredditPageComponents/SubredditPageBanner"
import SubredditPagePosts from "./SubredditPageComponents/SubredditPosts"
import SubredditPageBar from "./SubredditPageComponents/SubredditPageBar/SubredditPageBar"
import CreatePostSection from "./SubredditPageComponents/CreatePostSection"


const SubredditPage = () => {
    // console.log('booba')

    return (
        <div id="subreddit-page-main-container">
            <section id="subreddit-page-banner-container">
                <SubredditPageBanner />
            </section>
            <section id="subreddit-page-body-container">
                <aside id="subreddit-page-posts-main-container">
                    <CreatePostSection />
                    <SubredditPagePosts />
                </aside>
                <aside id="subreddit-page-bar-main-container">
                    <SubredditPageBar />
                </aside>
            </section>
        </div>
    )


}

export default SubredditPage
