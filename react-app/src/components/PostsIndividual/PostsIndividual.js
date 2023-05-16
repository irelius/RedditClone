import "./PostsIndividual.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import PostBody from "../PostsIndividual/PostComponents/PostBody/PostBody"
import PostSubreadditBar from "./PostComponents/PostSubreadditBar/PostSubreadditBar";
import PostComments from "./PostComponents/PostComments/PostComments";
import PostCreateComment from "./PostComponents/PostCreateComment/PostCreateComment";

import * as subredditActions from "../../store/subreddit"
import * as postActions from "../../store/post"
import * as userActions from "../../store/session"
import * as likeActions from "../../store/like"
import * as commentActions from "../../store/comment"


const PostsIndividual = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [load, setLoad] = useState(false)

    const { subreddit_name, post_id } = useParams();

    useEffect(() => {
        dispatch(userActions.loadAllUserThunk())
        dispatch(subredditActions.loadCurrentSubredditThunk(subreddit_name))
        dispatch(postActions.loadPostThunk(post_id))
        // dispatch(commentActions.loadPostCommentsThunk(post_id))
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
    // const currentComments = Object.values(useSelector(commentActions.loadAllComments))
    const currentUser = allUsers[0] || -1

    return (
        <div id="post-main-container">
            <section id="post-close-button-container">
                <button onClick={() => history.goBack()} id="post-close-button">
                    <i className="fa-solid fa-xmark fa-lg" />
                    Close
                </button>
            </section>
            <section id="post-main-body-container">
                <aside id="post-left-section">
                    <section id="post-body-container">
                        {PostBody({ currentPostLikes, currentPost, currentSubreddit, allUsers, currentUser, load })}
                    </section>
                    <section id="post-create-comment-container">
                        {PostCreateComment({ currentPost, currentSubreddit, allUsers, currentUser, load })}
                    </section>
                    <section id="post-comments-container">
                        {PostComments({ currentPost, currentSubreddit, allUsers, currentUser, post_id, load })}
                    </section>
                </aside>
                <aside id="post-right-section">
                    <section id="post-subreaddit-bar-container">
                        {PostSubreadditBar({ currentSubreddit })}
                    </section>
                </aside>
            </section>
        </div>
    )
}

export default PostsIndividual;
