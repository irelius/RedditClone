import "./UsersPage.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as postActions from "../../../store/post"
import * as subredditActions from "../../../store/subreddit"

import calculatePostLikes from "../../HelperFunctions/calculatePostLikes";

const UsersPage = () => {
    const username = useParams().username;
    console.log("booba", username)
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        dispatch(postActions.loadUserPostsThunk(username))
        dispatch(subredditActions.loadSubredditsThunk())
        setLoad(true)
    }, [dispatch])

    const currentUserPosts = Object.values(useSelector(postActions.loadAllPosts))
    const allSubreddits = Object.values(useSelector(subredditActions.loadAllSubreddit))

    const redirectToUserPage = (username, e) => {
        e.stopPropagation();

        history.push(`/users/${username}`)
    }

    const redirectToPostPage = (post) => {
        const postId = post.id
        const subredditName = allSubreddits[0][post.subreddit_id]["name"]

        history.push(`/r/${subredditName}/${postId}`)
    }

    const redirectToSubredditPage = (name, e) => {
        e.stopPropagation();

        history.push(`/r/${name}`)
    }


    const loadUsersPage = () => {
        const postsToLoad = Object.values(currentUserPosts[0])
        const subredditsToLoad = allSubreddits[0]
        // TO DO: Create a tabs section? to view overview, posts, subreddits, etc?


        return (
            Array.isArray(postsToLoad) && postsToLoad.map((el, i) => {
                const subredditId = el["subreddit_id"]
                const subredditInfo = subredditsToLoad[subredditId]

                return (
                    <div id="user-posts-main-container" onClick={() => redirectToPostPage(el)}>
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
                                    <section id="user-posts-header-subreddit-information" onClick={(e) => redirectToSubredditPage(subredditInfo.name, e)}>
                                        r/{subredditInfo.name}
                                    </section>
                                ) : (
                                    <section id="user-post-header-no-subreddit">
                                        Subreddit no longer exists.
                                    </section>
                                )}
                                <aside id="user-posts-header-poster-container">
                                    Posted by
                                    <section id="user-post-header-poster" onClick={(e) => redirectToUserPage(username, e)}>
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


    return username && currentUserPosts.length > 0 && allSubreddits.length > 0 && load ? (
        <div>
            <div id="user-posts-user">
                Posts made by u/{username}
            </div>
            <div id="users-posts">
                {loadUsersPage()}
            </div>
        </div>
    ) : (
        <div id="users-posts-no-user">
            No such user is found
        </div>
    )
}

export default UsersPage;
