import "./UsersPagePosts.css"

import { useHistory, useParams } from "react-router-dom"

import calculatePostLikes from "../../../../HelperFunctions/calculatePostLikes"
import redirectToPostPage from "../../../../HelperFunctions/redirectToPostPage"
import redirectToSubredditPage from "../../../../HelperFunctions/redirectToSubredditPage"
import redirectToUserPage from "../../../../HelperFunctions/redirectToUserPage"

const UsersPagePosts = ({ props }) => {
    const history = useHistory();
    const username = useParams().username;

    const postsToLoad = Object.values(props["allPosts"][0])
    const subredditsToLoad = props["allSubreddits"][0]

    return (
        Array.isArray(postsToLoad) && postsToLoad.map((el, i) => {
            const subredditInfo = subredditsToLoad[el["subreddit_id"]]

            return (
                <div key={i} id="user-posts-main-container" onClick={(e) => redirectToPostPage(subredditInfo["name"], el["id"], history, e)}>
                    <aside id="user-posts-left-container">
                        <aside id="post-upvote-button">
                            <i className="fa-solid fa-up-long fa-lg" />
                        </aside>
                        <aside id="post-vote-counter">{calculatePostLikes(el)}</aside>
                        <aside id="post-downvote-button">
                            <i className="fa-solid fa-down-long fa-lg" />
                        </aside>
                    </aside>
                    <aside id="user-posts-right-container">
                        <section id="user-posts-header-container">
                            {subredditInfo ? (
                                <section id="user-posts-header-subreddit-information" onClick={(e) => redirectToSubredditPage(subredditInfo.name, history, e)}>
                                    r/{subredditInfo.name}
                                </section>
                            ) : (
                                <section id="user-post-header-no-subreddit">
                                    Subreddit no longer exists.
                                </section>
                            )}
                            <aside id="user-posts-header-poster-container">
                                Posted by
                                <section id="user-post-header-poster" onClick={(e) => redirectToUserPage(username, history, e)}>
                                    u/{username}
                                </section>
                            </aside>
                        </section>
                        <section id="user-posts-post-container">
                            <section id="user-post-title">
                                {el.title}
                            </section>
                            <section id="user-post-body">
                                {el.body}
                            </section>
                        </section>
                        <section id="user-posts-footer-container">
                            <aside id="user-post-footer-comments-container">
                                <aside>
                                    <i id="user-post-footer-comments-icon" className="fa-regular fa-message fa-lg" />
                                </aside>
                                <aside id="user-post-footer-comments">
                                    Comments
                                </aside>
                            </aside>
                            <aside id="user-post-footer-dots-container">
                                <i id="user-post-footer-dots-icon" className="fa-solid fa-ellipsis" />
                            </aside>
                        </section>
                    </aside>
                </div >
            )
        })
    )
}

export default UsersPagePosts;
