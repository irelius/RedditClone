import "./UsersPage.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as sessionActions from "../../../store/session"
import * as subredditActions from "../../../store/subreddit"
import * as postActions from "../../../store/post"
import * as commentActions from "../../../store/comment"

import ErrorPage from "../../ErrorPage"
import UsersPageComments from "./UsersPageComponents/UsersPageComments/UsersPageComments";
import UsersPagePosts from "./UsersPageComponents/UsersPagePosts/UsersPagePosts";

import calculatePostLikes from "../../HelperFunctions/calculatePostLikes";
import redirectToUserPage from "../../HelperFunctions/redirectToUserPage"
import redirectToPostPage from "../../HelperFunctions/redirectToPostPage"
import redirectToSubredditPage from "../../HelperFunctions/redirectToSubredditPage"

const UsersPage = () => {
    const dispatch = useDispatch()
    const username = useParams().username;
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const [tabSelected, setTabSelected] = useState("posts")


    useEffect(() => {
        dispatch(sessionActions.loadAllUserThunk())
        dispatch(commentActions.loadUserCommentsThunk(username))
        dispatch(postActions.loadUserPostsThunk(username))
        dispatch(subredditActions.loadSubredditsThunk())
        setLoad(true)
    }, [dispatch])

    const currentUserPosts = Object.values(useSelector(postActions.loadAllPosts))
    const currentUserComments = Object.values(useSelector(commentActions.loadAllComments))
    const allUsers = Object.values(useSelector(sessionActions.loadAllUsers))
    const allSubreddits = Object.values(useSelector(subredditActions.loadAllSubreddit))

    // Main Component
    const loadUsersPage = () => {
        const postsToLoad = Object.values(currentUserPosts[0])
        const subredditsToLoad = allSubreddits[0]
        // TO DO: Create a tabs section? to view overview, posts, subreddits, etc?


        return (
            Array.isArray(postsToLoad) && postsToLoad.map((el, i) => {
                const subredditId = el["subreddit_id"]
                const subredditInfo = subredditsToLoad[subredditId]

                return (
                    <div id="user-posts-main-container" onClick={(e) => redirectToPostPage(el, history, e)}>
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

    const loadBody = () => {
        if (tabSelected === "posts") {
            return (
                <div>
                    <UsersPagePosts currentUserPosts={currentUserPosts} />
                </div>
            )
        } else if (tabSelected === "comments") {
            return (
                <div>
                    <UsersPageComments currentUserComments={currentUserComments} />
                </div>
            )
        }
    }

    return allUsers.length > 0 && currentUserPosts.length > 0 && allSubreddits.length > 0 && load ? (
        <div id="user-page-main-container">
            <section id="user-page-tabs-container">
                <aside id="user-page-posts-tab-container">
                    <section id="user-page-posts-tab" className={`posts-selected-${tabSelected}`} onClick={() => setTabSelected("posts")}>
                        POSTS
                    </section>
                </aside>
                <aside id="user-page-comments-tab-container">
                    <section id="user-page-comments-tab" className={`comments-selected-${tabSelected}`} onClick={() => setTabSelected("comments")}>
                    COMMENTS
            </section>
        </aside>
            </section >
    <section id="user-page-content-container">
        {loadBody()}
    </section>
        </div >
    ) : (
    <div id="users-posts-no-user">
        <ErrorPage />
    </div>
)
}

export default UsersPage;
