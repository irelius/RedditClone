import "./TestPage.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import PostBody from "../PostsIndividual/PostComponents/PostBody"
import PostSubreadditBar from "../PostsIndividual/PostComponents/PostSubreadditBar";
import PostComments from "../PostsIndividual/PostComponents/PostComments";
import PostCreateComment from "../PostsIndividual/PostComponents/PostCreateComment";

import * as subredditActions from "../../store/subreddit"
import * as postActions from "../../store/post"
import * as userActions from "../../store/session"
import * as likeActions from "../../store/like"
import * as commentActions from "../../store/comment"

const TestPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [load, setLoad] = useState(false)

    const { subreddit_name, post_id } = useParams();

    useEffect(() => {
        dispatch(userActions.loadAllUserThunk())
        dispatch(subredditActions.loadCurrentSubredditThunk(subreddit_name))
        dispatch(postActions.loadPostThunk(post_id))
        dispatch(commentActions.loadPostCommentsThunk(post_id))
        dispatch(likeActions.loadLikesPostThunk(post_id))
        setLoad(true)

        return (() => {
            dispatch(subredditActions.clearSubreddit())
            dispatch(postActions.clearPost())
            dispatch(commentActions.clearComment())
            dispatch(likeActions.clearLikes())
        })
    }, [dispatch])

    const currentPostLikes = Object.values(useSelector(likeActions.loadPostLikes))
    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(state => state.session))
    const currentComments = Object.values(useSelector(commentActions.loadAllComments))
    const currentUser = allUsers[0] || -1

    return (
        <div id="test-main-container">
            <section id="test-button-container">
                <button onClick={() => history.goBack()} id="post-page-close-button">
                    <i className="fa-solid fa-xmark fa-lg" />
                    Close
                </button>
            </section>
            <section id="test-post-main-body">
                <aside id="test-post-left-section">
                    <section>
                        {PostBody({ currentPostLikes, currentPost, currentSubreddit, allUsers, currentUser, load })}
                    </section>
                    <section>
                        {PostCreateComment({ currentPost, currentSubreddit, allUsers, currentUser, load })}
                    </section>
                    <section>
                        {PostComments({ currentComments, currentPost, currentSubreddit, allUsers, currentUser, load })}
                    </section>
                </aside>
                <aside id="test-post-right-section">
                    {PostSubreadditBar({ currentSubreddit })}
                </aside>
            </section>
        </div>
    )
}

export default TestPage
