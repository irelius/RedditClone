import "./UsersPageComments.css"

import { useHistory, useParams } from "react-router-dom"

import redirectToPostPage from "../../../../HelperFunctions/redirectToPostPage"
import redirectToSubredditPage from "../../../../HelperFunctions/redirectToSubredditPage"
import redirectToUserPage from "../../../../HelperFunctions/redirectToUserPage"

const UsersPageComments = ({ props }) => {
    const history = useHistory()
    const username = useParams().username;

    const comments = props["currentUserComments"][0]
    const commentsArray = Object.values(comments)
    const posts = props["allPosts"][0]
    const subreddits = props["allSubreddits"][0]
    const allUsers = props["allUsers"][1]

    return (
        Array.isArray(commentsArray) && commentsArray.map((el, i) => {
            const belongToSubredditId = el["subreddit_id"]
            const postSubreddit = subreddits[belongToSubredditId]
            const belongToPostId = el["post_id"]
            const post = posts[belongToPostId]
            const postPoster = allUsers[post['user_id']]

            return (
                <div key={i} id="user-comments-main-container" onClick={(e) => redirectToPostPage(postSubreddit["name"], belongToPostId, history, e)}>
                    <section id="user-comments-header-container">
                        <aside id="user-comments-header-icon">
                            <i className="fa-regular fa-message fa-xl" />
                        </aside>
                        <aside id="user-comments-header-description">
                            <section id="user-comments-header-username" onClick={(e) => redirectToUserPage(username, history, e)}>
                                {username}
                            </section>
                            commented on
                            <section id="user-comments-header-post" onClick={(e) => redirectToPostPage(postSubreddit["name"], belongToPostId, history, e)}>
                                {post["title"]}
                            </section>
                        </aside>
                        <aside id="user-comments-header-subreddit" onClick={(e) => redirectToSubredditPage(postSubreddit["name"], history, e)}>
                            r/{subreddits[belongToSubredditId]["name"]}
                        </aside>
                        Posted by
                        <aside id="user-comments-header-poster" onClick={(e) => redirectToUserPage(postPoster["username"], history, e)}>
                            u/{postPoster["username"]}
                        </aside>
                    </section>
                    <section id="user-comments-body-container">
                        <section id="user-comments-body-header-container">
                            <aside id="user-comments-body-username" onClick={(e) => redirectToUserPage(username, history, e)}>
                                {username}
                            </aside>
                            <aside id="user-comments-OP">
                                OP
                            </aside>
                        </section>
                        <section id="user-comments-body">
                            {el["body"]}
                        </section>
                    </section>
                    <section id="user-comments-footer-container">

                    </section>
                </div>
            )
        })
    )
}

export default UsersPageComments
