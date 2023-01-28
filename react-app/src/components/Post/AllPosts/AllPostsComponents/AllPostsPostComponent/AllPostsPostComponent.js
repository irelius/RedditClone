import "./AllPostsPostComponent.css"

import { useHistory } from "react-router-dom"

import redirectToSubredditPage from "../../../../HelperFunctions/redirectToSubredditPage";
import redirectToUserPage from "../../../../HelperFunctions/redirectToUserPage";
import redirectToPostPage from "../../../../HelperFunctions/redirectToPostPage";

const AllPostsPostComponent = (post, usersToLoad, subredditsToLoad) => {
    const history = useHistory();

    const postTitle = post["title"]
    const postBody = post["body"]
    const postSubreddit = subredditsToLoad[post["subreddit_id"]]
    const postPoster = usersToLoad[post["user_id"]]
    const postImage = post["image"]

    return (
        <aside id="individual-post-main-container" onClick={(e) => redirectToPostPage(postSubreddit["name"], post["id"], history, e)}>
            <section id="individual-post-header-container">
                <aside id="individual-post-header-subreddit-information">
                    <section id="post-header-subreddit-information" onClick={(e) => redirectToSubredditPage(postSubreddit["name"], history, e)}>
                        r/{postSubreddit["name"]}
                    </section>
                </aside>
                <aside id="individual-post-header-poster-information">
                    Posted by
                    <section id="individual-post-header-poster" onClick={(e) => redirectToUserPage(postPoster["username"], history, e)}>
                        u/{postPoster["username"]}
                    </section>
                </aside>
                {/* <aside id="post-header-join -container">
                </aside> */}
            </section>
            <section id="individual-post-body-container">
                <section id="individual-post-title">
                    {postTitle}
                </section>
                <section id="individual-post-image">
<<<<<<< HEAD
                    {post["image"] !== null ? (
                        <img src={`${post["image"]}`}
                            width={300}
=======
                    {postImage !== null ? (
                        <img src={`${postImage}`}
                            width={400}
>>>>>>> refactoring-components
                        ></img>
                    ) : (
                        <div></div>
                    )}
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
