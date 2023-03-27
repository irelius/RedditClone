import { useHistory } from "react-router-dom"

import redirectToSubredditPage from "../../HelperFunctions/redirectToSubredditPage";

const PostSubreadditBar = ({ currentSubreddit }) => {
    const history = useHistory();
    let subredditToLoad;
    let subredditDate;

    if (currentSubreddit[0]) {
        subredditToLoad = Object.values(currentSubreddit[0])[0]
        subredditDate = subredditToLoad.created_at.split(" ")
        subredditDate = subredditDate[2] + " " + subredditDate[1] + ", " + subredditDate[3]
    }

    const SubredditBar = () => {
        return (
            <div onClick={(e) => redirectToSubredditPage(subredditToLoad["name"], history, e)} id="post-page-bar-main-container">
                <section id="post-page-bar-banner">
                </section>
                <section id="post-page-bar-header-container">
                    <aside id="post-page-bar-icon">
                        r/
                    </aside>
                    <aside id="post-page-bar-header">
                        r/{subredditToLoad.name}
                    </aside>
                </section>
                <section id="post-page-bar-details-container">
                    <section id="post-page-bar-details-body">
                        {subredditToLoad.description}
                    </section>
                    <section id="post-page-bar-date">
                        Created {subredditDate}
                    </section>
                </section>
            </div>
        )
    }

    return currentSubreddit.length > 0 ? (
        <div>
            {SubredditBar()}
        </div>
    ) : (
        <div></div>
    )
}

export default PostSubreadditBar
