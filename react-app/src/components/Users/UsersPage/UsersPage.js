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

const UsersPage = () => {
    const dispatch = useDispatch()
    const username = useParams().username;
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const [tabSelected, setTabSelected] = useState("posts")


    useEffect(() => {
        dispatch(sessionActions.loadAllUserThunk())
        dispatch(commentActions.loadUserCommentsThunk(username))
        dispatch(postActions.loadPostsThunk())
        dispatch(subredditActions.loadSubredditsThunk())
        setLoad(true)
    }, [dispatch])

    const allUsers = Object.values(useSelector(sessionActions.loadAllUsers))
    const currentUserId = allUsers[0]["id"]
    const allPosts = Object.values(useSelector(postActions.loadAllPosts))
    const allSubreddits = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const currentUserComments = Object.values(useSelector(commentActions.loadAllComments))


    const loadBody = () => {
        let props = {
            "allSubreddits": allSubreddits,
            "allPosts": allPosts,
            "currentUserComments": currentUserComments,
            "allUsers": allUsers
        }
        if (tabSelected === "posts") {
            const profileUserId = Object.values(allUsers[1]).filter(el => {
                if (el["username"] === username) {
                    return el['id']
                }
            })[0]["id"]

            props["allPosts"] = {
                0: Object.values(allPosts[0]).filter(el => {
                    if (el["user_id"] === profileUserId) {
                        return el
                    }
                })
            }

            return (
                <div>
                    <UsersPagePosts props={props} />
                </div>
            )
        } else if (tabSelected === "comments") {
            return (
                <div>
                    <UsersPageComments props={props} />
                </div>
            )
        }
    }

    return allUsers.length > 0 && allPosts.length > 0 && allSubreddits.length > 0 && load ? (
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
