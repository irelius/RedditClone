import "./OnePost.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as subredditActions from "../../../store/subreddit"
import * as postActions from "../../../store/post"
import * as userActions from "../../../store/session"
import * as likeActions from "../../../store/like"
import * as commentActions from "../../../store/comment"


const OnePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const [errors, setErrors] = useState([])
    const [newPostBody, setNewPostBody] = useState(null)
    const [loadEditComponent, setLoadEditComponent] = useState(false)
    const [commentBody, setCommentBody] = useState("")

    const [likeTotal, setLikeTotal] = useState(0)
    const [modifier, setModifier] = useState(0)
    const [postLikeStatus, setPostLikeStatus] = useState("neutral")

    const { subreddit_name, post_id } = useParams();

    useEffect(() => {
        dispatch(userActions.loadAllUserThunk())
        dispatch(subredditActions.loadCurrentSubredditThunk(subreddit_name))
        dispatch(postActions.loadPostThunk(post_id))
        dispatch(commentActions.loadPostCommentsThunk(post_id))
        dispatch(likeActions.loadLikesPostThunk(post_id))
        setLoad(true)
        dispatch(subredditActions.clearSubreddit())
        dispatch(likeActions.clearLikes())
        dispatch(commentActions.clearComment())
        return () => dispatch(postActions.clearPost())
    }, [dispatch, setLoadEditComponent, setNewPostBody])

    const currentPostLikes = Object.values(useSelector(likeActions.loadPostLikes))
    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const currentComments = Object.values(useSelector(commentActions.loadAllComments))
    const allUsers = Object.values(useSelector(state => state.session))

    useEffect(() => {
        if (currentPostLikes.length > 0) {
            const currentUser = allUsers[0] || -1
            const likesArray = Object.values(currentPostLikes[0]["likes"])
            const dislikesArray = Object.values(currentPostLikes[0]["dislikes"])

            likesArray.forEach(el => {
                if (el["user_id"] === currentUser.id) {
                    setPostLikeStatus('like')
                }
            })
            dislikesArray.forEach(el => {
                if (el["user_id"] === currentUser.id) {
                    setPostLikeStatus('dislike')
                }
            })
            setLikeTotal(currentPostLikes[0]["likes_total"])
        }

        // console.log("booba liketotal", likeTotal)
        // console.log("booba modifier", modifier)
        // console.log("booba status", postLikeStatus)

    }, [dispatch, currentPostLikes, modifier, postLikeStatus])
    //

    const redirectToSubreddit = (subredditToLoad, e) => {
        e.stopPropagation()

        history.push(`/r/${subredditToLoad.name}`)
    }


    const redirectToUserPage = (username, e) => {
        e.stopPropagation();

        history.push(`/users/${username}`)
    }


    // Post Update
    const updatePost = async (e) => {
        e.preventDefault();

        const postToEdit = currentPost[0]

        let postInfo = {
            title: postToEdit.title,
            body: newPostBody
        }

        dispatch(postActions.putPostThunk(postInfo, postToEdit))
        currentPost[0].body = postInfo.body

        setLoadEditComponent(false)
    }
    //


    // Post Removal/Deletion
    const handlePostDelete = (e) => {
        e.stopPropagation()
        const postToDelete = currentPost[0]
        const confirmDelete = prompt(
            `Are you sure you want to delete your post? You can't undo this`, "Yes"
        )

        if (confirmDelete === "Yes") {
            dispatch(postActions.deletePostThunk(postToDelete))
            history.goBack()
        }
    }
    const handlePostRemove = () => {
        const postToDelete = currentPost[0]
        dispatch(postActions.deletePostThunk(postToDelete))
        history.goBack();
    }
    //

    // Comment Creation
    const createComment =  async (e) => {
        e.preventDefault();

        let commentInfo = {
            body: commentBody
        }

        const data = await dispatch(commentActions.createCommentThunk(commentInfo, currentPost[0]["id"]))
        if(data) {
            setErrors(data)
        }

        if(data === null) {
        }

    }

    // Comment Removal/Deletion
    const handleCommentDelete = (el) => {
        const confirmDelete = prompt(
            `Are you sure you want to delete this comment? You can't undo this`, "Yes"
        )

        if (confirmDelete === "Yes") {
            dispatch(commentActions.deleteCommentThunk(el))
        }
    }
    const handleCommentRemoval = (el) => {
        const confirmDelete = prompt(
            `Are you sure you want to remove this comment? You can't undo this`, "Yes"
        )

        if (confirmDelete === "Yes") {
            dispatch(commentActions.deleteCommentThunk(el))
        }
    }
    //



    // Like/Dislike Handling
    const likeHandler = async (postToLoad, postLikeStatus) => {
        let likeInfo = {
            like_status: "like"
        }

        if (postLikeStatus === "like") {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))

            setPostLikeStatus("neutral")
            setModifier(0)
        } else {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
            dispatch(likeActions.createLikePostThunk(likeInfo, postToLoad.id))

            setPostLikeStatus("like")
            setModifier(1)
        }

        // console.log("booba liketotal", likeTotal)
        // console.log("booba modifier", modifier)
        // console.log("booba asdf", postLikeStatus)

    }

    const dislikeHandler = (postToLoad, postLikeStatus) => {
        let likeInfo = {
            like_status: "dislike"
        }

        if (postLikeStatus === "dislike") {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))

            setPostLikeStatus("neutral")
            setModifier(0)
        } else {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
            dispatch(likeActions.createDislikePostThunk(likeInfo, postToLoad.id))

            setPostLikeStatus('dislike')
            setModifier(-1)
        }

    }


    // Components
    const loadFooter = (currentUser, postToLoad, subredditToLoad) => {
        if (currentUser.id === postToLoad["user_id"]) {
            return (
                <section onClick={() => setLoadEditComponent(true)} id="post-page-post-footer-container">
                    <aside id="post-page-post-edit-container">
                        <aside id="post-page-post-button-icon">
                            <i className="fa-regular fa-pen-to-square fa-lg" />
                        </aside>
                        <button id="post-page-post-edit-button">
                            Edit Post
                        </button>
                    </aside>
                    <aside onClick={handlePostDelete} id="post-page-post-delete-container">
                        <aside id="post-page-post-button-icon">
                            <i className="fa-solid fa-trash-can fa-lg" />
                        </aside>
                        <button id="post-page-post-delete-button">
                            Delete Post
                        </button>
                    </aside>
                </section>
            )
        } else if (currentUser.id === subredditToLoad.admin_id) {
            return (
                <section id="post-page-post-footer-container">
                    <aside onClick={handlePostRemove} id="post-page-post-delete-container">
                        <aside id="post-page-post-button-icon">
                            <i className="fa-solid fa-ban fa-lg" />
                        </aside>
                        <button id="post-page-post-delete-button">
                            Remove Post
                        </button>
                    </aside>
                </section>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    const loadEditPostSection = (postToLoad) => {
        if (newPostBody === null && postToLoad.body) {
            setNewPostBody(postToLoad.body)
        }

        return (
            <form id="post-page-edit-main-container" onSubmit={updatePost}>
                <section id="post-page-edit-input-container">
                    <textarea id="post-page-edit-input"
                        type="text"
                        value={newPostBody}
                        onChange={(e) => setNewPostBody(e.target.value)}
                    >
                    </textarea>
                    <section id="post-page-edit-button-container">
                        <button id="post-page-edit-cancel-button" onClick={() => setLoadEditComponent(false)}>
                            Cancel
                        </button>
                        <button id="post-page-edit-save-button" type="submit">
                            Save
                        </button>
                    </section>
                </section>
            </form>
        )
    }
    const loadComments = (currentUser) => {
        if (currentComments.length > 0) {
            const commentsToLoad = Object.values(currentComments[0])
            return (
                Array.isArray(commentsToLoad) && commentsToLoad.map(el => {
                    let commentPoster = allUsers[1][el["user_id"]]
                    let commentDate = el["created_at"].split(" ")
                    commentDate = commentDate[2] + " " + commentDate[1] + ", " + commentDate[3]

                    return (
                        <div id='comments-section-main-container'>
                            <section id="comments-section-header">
                                <img id="comments-section-poster-profile-pic"
                                    src={commentPoster["profile_image"]}
                                    width={30}
                                    height={30}
                                    alt="commentPosterProfileImage"
                                />
                                <aside onClick={(e) => redirectToUserPage(commentPoster.username, e)} id="comments-section-poster-username">
                                    {commentPoster["username"]}
                                </aside>
                                <aside>
                                    -
                                </aside>
                                <aside id="comments-section-date">
                                    {commentDate}
                                </aside>
                            </section>
                            <section id="comments-section-comment">
                                {el["body"]}
                            </section>
                            <section id="comments-section-footer">
                                {
                                    currentUser["id"] === el["user_id"] ? (
                                        <div id="comments-footer-delete-comment" onClick={() => handleCommentDelete(el)}>
                                            <i className="fa-regular fa-trash-can"></i>
                                            <aside className="comments-footer-text">
                                                Delete Comment
                                            </aside>
                                        </div>
                                    ) : (
                                        <div id="comments-footer-remove-comment" onClick={() => handleCommentRemoval(el)}>
                                            <i className="fa-solid fa-ban"></i>
                                            <aside className="comments-footer-text">
                                                Remove Comment
                                            </aside>
                                        </div>
                                    )
                                }
                            </section>
                        </div>
                    )
                })
            )
        } else {
            return (
                <div id='comments-section-no-comments'>
                    There are no comments yet. Why don't you fix that?
                </div>
            )
        }
    }
    const createCommentComponent = (currentUser) => {
        return (
            <div id="create-comment-main-container">
                <section id="create-comment-commenter-container">
                    <aside>
                        Comment as
                    </aside>
                    <aside id="create-comment-commenter-name">
                        {currentUser["username"]}
                    </aside>
                </section>
                <section id="create-comment-form-container">
                    <form onSubmit={createComment} id="create-comment-form">
                        <textarea id="create-comment-form-body"
                            type="text"
                            placeholder="What are your thoughts?"
                            minLength={1}
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                        />
                        <button type="submit">
                            Comment
                        </button>
                    </form>

                </section>
            </div>
        )
    }
    //


    // Main Component
    const LoadOnePost = () => {
        const postToLoad = currentPost[0]

        const userToLoad = allUsers[1][postToLoad["user_id"]]
        const currentUser = allUsers[0] || -1

        const subredditToLoad = Object.values(currentSubreddit[0])[0]
        let subredditDate = subredditToLoad.created_at.split(" ")
        subredditDate = subredditDate[2] + " " + subredditDate[1] + ", " + subredditDate[3]

        return (
            <div id="post-page-background-2">
                <div id="post-page-close-button-container">
                    <button onClick={() => history.goBack()} id="post-page-close-button">
                        <i className="fa-solid fa-xmark fa-lg" />
                        Close
                    </button>
                </div>
                <div id="post-page-main-container">
                    <aside id="post-page-post-main-container">
                        <aside id="post-page-post-left-container">
                            <aside onClick={async () => await likeHandler(postToLoad, postLikeStatus)} id="post-upvote-button">
                                <i id={'post-like-status-' + postLikeStatus} className="fa-solid fa-up-long fa-lg" />
                            </aside>
                            <aside id="post-vote-counter">{likeTotal + modifier}</aside>
                            <aside onClick={async () => await dislikeHandler(postToLoad, postLikeStatus)} id="post-downvote-button">
                                <i id={'post-dislike-status-' + postLikeStatus} className="fa-solid fa-down-long fa-lg" />
                            </aside>
                        </aside>
                        <aside id="post-page-post-right-container">
                            <section id="post-page-post-header-container">
                                <aside onClick={(e) => redirectToSubreddit(subredditToLoad, e)} id="post-page-post-header">
                                    r/{subredditToLoad.name}
                                </aside>
                                <aside id="post-page-post-poster-decoration-text">
                                    Posted by
                                </aside>
                                <aside id="post-page-post-poster" onClick={(e) => redirectToUserPage(userToLoad.username, e)}>
                                    u/{userToLoad.username}
                                </aside>
                            </section>
                            <section id="post-page-post-title-container">
                                <section id="post-page-post-title">
                                    {postToLoad.title}
                                </section>
                            </section>
                            <section id="post-page-post-body-container">
                                {loadEditComponent ? (
                                    <section>
                                        {loadEditPostSection(postToLoad)}
                                    </section>
                                ) : (
                                    <section id="post-page-post-body">
                                        {postToLoad.body}
                                    </section>
                                )}
                            </section>
                            <section>
                                {loadFooter(currentUser, postToLoad, subredditToLoad)}
                            </section>
                            <aside id="post-page-comments-form-container">
                                {createCommentComponent(currentUser)}
                            </aside>
                            <aside id="post-page-comments-section-container">
                                {loadComments(currentUser, subredditToLoad)}

                                {/* {PostComments(currentComments, allUsers, currentUser, subredditToLoad)} */}
                            </aside>
                        </aside>
                    </aside>
                    <aside onClick={(e) => redirectToSubreddit(subredditToLoad, e)} id="post-page-bar-main-container">
                        <section id="post-page-bar-banner">
                        </section>
                        <section id="post-page-bar-header-container">
                            <aside id="post-page-bar-icon">
                                r/
                            </aside>
                            <aside id="post-page-bar-header">
                                r/{subredditToLoad.name}
                            </aside>
                        </section>
                        <section id="post-page-bar-details-container">
                            <section id="post-page-bar-details-body">
                                {subredditToLoad.description}
                            </section>
                            <section id="post-page-bar-date">
                                Created {subredditDate}
                            </section>
                        </section>
                    </aside>
                </div>
            </div >
        )
    }

    return currentPost.length > 0 && currentSubreddit.length > 0 && allUsers.length > 1 && currentPostLikes.length > 0 && currentComments.length > 0 && load ? (
        <div id="post-page-background-1">
            {LoadOnePost()}
        </div>
    ) : (
        <div></div>
    )


}

export default OnePost
