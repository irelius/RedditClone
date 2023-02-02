import "./TestPage.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as commentActions from "../../store/comment"
import * as userActions from "../../store/session"
import * as likeActions from "../../store/like"
import * as subredditActions from "../../store/subreddit"
import * as postActions from "../../store/post"



const TestPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const [errors, setErrors] = useState([])
    const [newPostBody, setNewPostBody] = useState(null)
    const [loadEditPostComponent, setLoadEditPostComponent] = useState(false)
    const [newCommentBody, setNewCommentBody] = useState(null)
    const [loadEditCommentComponent, setLoadEditCommentComponent] = useState(false)
    const [askUserToLogin, setAskUserToLogin] = useState(false)

    const [commentBody, setCommentBody] = useState("")

    const [likeTotal, setLikeTotal] = useState(0)
    const [postLikeStatus, setPostLikeStatus] = useState("neutral")

    // const { subreddit_name, post_id } = useParams();

    const subreddit_name = "Subreaddit1"
    const post_id = 9

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

    }, [dispatch, setLoadEditPostComponent, setNewPostBody, setLoadEditCommentComponent, setNewCommentBody])

    const currentPostLikes = Object.values(useSelector(likeActions.loadPostLikes))
    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const currentComments = Object.values(useSelector(commentActions.loadAllComments))


    return (
        <div id="test-page-main-container">
            <button>test</button>
        </div>
    )

}

export default TestPage
