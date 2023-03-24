import "./TestPage.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { Modal } from "../../context/Modal";

import PostBody from "../PostsIndividual/PostComponents/PostBody"

import * as subredditActions from "../../store/subreddit"
import * as postActions from "../../store/post"
import * as userActions from "../../store/session"
import * as likeActions from "../../store/like"

const TestPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [load, setLoad] = useState(true)
    const { subreddit_name, post_id } = useParams();

    useEffect(() => {
        console.log('booba, useeffect')
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
    }, [dispatch])

    const currentPostLikes = Object.values(useSelector(likeActions.loadPostLikes))
    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(state => state.session))
    const currentUser = allUsers[0] || -1

    return (
        <div>
            <section>{PostBody()}</section>
        </div>
    )

}

export default TestPage
