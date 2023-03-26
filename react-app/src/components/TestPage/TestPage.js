import "./TestPage.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { Modal } from "../../context/Modal";

import PostBody from "../PostsIndividual/PostComponents/PostBody"
import PostSubreadditBar from "../PostsIndividual/PostComponents/PostSubreadditBar";

import * as subredditActions from "../../store/subreddit"
import * as postActions from "../../store/post"
import * as userActions from "../../store/session"
import * as likeActions from "../../store/like"

const TestPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [load, setLoad] = useState(false)
    const [newPostBody, setNewPostBody] = useState(null)
    const [loadEditPostComponent, setLoadEditPostComponent] = useState(false)

    const { subreddit_name, post_id } = useParams();

    useEffect(() => {
        dispatch(userActions.loadAllUserThunk())
        dispatch(subredditActions.loadCurrentSubredditThunk(subreddit_name))
        dispatch(postActions.loadPostThunk(post_id))
        dispatch(likeActions.loadLikesPostThunk(post_id))

        setLoad(true)

        return (() => {
            dispatch(subredditActions.clearSubreddit())
            dispatch(postActions.clearPost())
            dispatch(likeActions.clearLikes())
        })
    }, [dispatch, setLoadEditPostComponent, setNewPostBody])

    const currentPostLikes = Object.values(useSelector(likeActions.loadPostLikes))
    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(state => state.session))
    const currentUser = allUsers[0] || -1

    return (
        <div id="individual-post-main-container">
            <aside id="individual-post-left-section">
                <section>
                    {PostBody({ currentPostLikes, currentPost, currentSubreddit, allUsers, currentUser, load })}
                </section>
                <section>

                </section>
                <section>

                </section>
                <section>

                </section>
            </aside>
            <aside id="individual-post-right-section">
                {PostSubreadditBar({currentSubreddit})}
            </aside>
        </div>
    )
}

export default TestPage
