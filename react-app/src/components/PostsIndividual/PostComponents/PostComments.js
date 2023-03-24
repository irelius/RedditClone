import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as subredditActions from "../../../store/subreddit"
import * as postActions from "../../../store/post"
import * as userActions from "../../../store/session"
import * as likeActions from "../../../store/like"
import * as commentActions from "../../../store/comment"

import ErrorPage from "../../ErrorPage";
import redirectToUserPage from "../../HelperFunctions/redirectToUserPage";
import redirectToSubredditPage from "../../HelperFunctions/redirectToSubredditPage";
import LogInOrSignUpModal from "../../Modals/LogInOrSignUpModal/LogInOrSignUpModal";

const PostComments = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const [errors, setErrors] = useState([])
    const [newPostBody, setNewPostBody] = useState(null)
    const [loadEditPostComponent, setLoadEditPostComponent] = useState(false)
    const [commentBody, setCommentBody] = useState("")
    const [newCommentBody, setNewCommentBody] = useState(null)
    const [loadEditCommentComponent, setLoadEditCommentComponent] = useState(false)
    const [askUserToLogin, setAskUserToLogin] = useState(false)


    return (
        <div>
            comments
        </div>
    )
}

export default PostComments
