import "./AllPostsPostComponent.css"

import { useHistory } from "react-router-dom"

const AllPostsPostComponent = (post, usersToLoad, subredditsToLoad) => {
    const history = useHistory();

    const postTitle = post["title"]
    const postBody = post["body"]
    const postSubreddit = subredditsToLoad[post["subreddit_id"]]
    const postPoster = usersToLoad[post["user_id"]]

    console.log('test', postPoster)


    return (
        <aside id="individual-post-main-container">
            <section id="individual-post-header-container">
                <aside id="individual-post-header-subreddit-information">
                    <section>
                        r/{postSubreddit["name"]}
                    </section>
                    {/* <section id="post-header-subreddit-information" onClick={(e) => redirectToSubredditPage(subredditInfo.name, e)}>
                        r/{subredditInfo.name}
                    </section> */}
                </aside>
                <aside id="individual-post-header-poster-information">
                    Posted by
                    <section id="individual-post-header-poster">
                        u/{postPoster["username"]}
                    </section>
                    {/* <section id="post-header-poster" onClick={(e) => redirectToUserPage(posterInfo.username, e)}>
                        u/{posterInfo.username}
                    </section> */}
                </aside>
                {/* <aside id="post-header-join -container">
                </aside> */}
            </section>
            <section id="individual-post-body-container">
                <section id="individual-post-title">
                    {postTitle}
                </section>
                <section id="individual-post-body">
                    {postBody}
                </section>
            </section>
            <section id="individual-post-footer-container">
                <aside id="individual-post-footer-comments-container">
                    <aside>
                        <i id="individual-post-footer-comments-icon" className="fa-regular fa-message fa-lg" />
                    </aside>
                    <aside id="individual-post-footer-comments">
                        Comments
                    </aside>
                </aside>
                <aside id="individual-post-footer-dots-container">
                    <i id="individual-post-footer-dots-icon" className="fa-solid fa-ellipsis" />
                </aside>
            </section>
        </aside>
    )
}

export default AllPostsPostComponent
