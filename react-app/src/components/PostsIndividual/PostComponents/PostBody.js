import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { Modal } from "../../../context/Modal";

import * as subredditActions from "../../../store/subreddit"
import * as postActions from "../../../store/post"
import * as userActions from "../../../store/session"
import * as likeActions from "../../../store/like"

import ErrorPage from "../../ErrorPage";
import redirectToUserPage from "../../HelperFunctions/redirectToUserPage";
import redirectToSubredditPage from "../../HelperFunctions/redirectToSubredditPage";
import LogInOrSignUpModal from "../../Modals/LogInOrSignUpModal/LogInOrSignUpModal";

const PostBody = ({ currentPostLikes, currentPost, currentSubreddit, allUsers, currentUser, load }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [newPostBody, setNewPostBody] = useState(null)
    const [loadEditPostComponent, setLoadEditPostComponent] = useState(false)
    const [askUserToLogin, setAskUserToLogin] = useState(false)
    const [likeTotal, setLikeTotal] = useState(0)
    const [postLikeStatus, setPostLikeStatus] = useState("neutral")

    const { subreddit_name, post_id } = useParams();



    useEffect(() => {
        if (currentPostLikes.length > 0) {
            const likesArray = Object.values(currentPostLikes[0]["likes"])
            const dislikesArray = Object.values(currentPostLikes[0]["dislikes"])

            likesArray.forEach(el => {
                if (el["user_id"] === currentUser["id"]) {
                    setPostLikeStatus('like')
                }
            })
            dislikesArray.forEach(el => {
                if (el["user_id"] === currentUser["id"]) {
                    setPostLikeStatus('dislike')
                }
            })

            if (likesArray.length === 0 && dislikesArray.length === 0) {
                setPostLikeStatus("neutral")
            }

            setLikeTotal(currentPostLikes[0]["likes_total"])

        }
    }, [currentPostLikes])


    // ----------------------------------------- Functions ---------------------------------------------- //
    // Post Update - function to handle post updates
    const updatePost = async (e) => {
        e.preventDefault();

        const postToEdit = currentPost[0]

        let postInfo = {
            title: postToEdit.title,
            body: newPostBody
        }

        dispatch(postActions.putPostThunk(postInfo, postToEdit))
        currentPost[0].body = postInfo.body

        setLoadEditPostComponent(false)
    }

    // Post Removal/Deletion - function to handle post removal/deletion
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
    const handlePostRemove = (e) => {
        e.stopPropagation()
        const postToDelete = currentPost[0]

        const confirmDelete = prompt(
            `Are you sure you want to remove this post? You can't undo this`, "Yes"
        )

        if (confirmDelete === "Yes") {
            dispatch(postActions.deletePostThunk(postToDelete))
            history.goBack();
        }
    }

    // Like/Dislike Handling - function to handle liking/disliking posts
    const likeHandler = async (postToLoad, postLikeStatus, e) => {
        let likeInfo = {
            like_status: "like"
        }

        if (postLikeStatus === "like") {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id)).then(() => (
                dispatch(likeActions.loadLikesPostThunk(postToLoad.id))
            ))

            setPostLikeStatus("neutral")
        } else {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
            dispatch(likeActions.createLikePostThunk(likeInfo, postToLoad.id)).then(() => (
                dispatch(likeActions.loadLikesPostThunk(postToLoad.id))
            ))

            setPostLikeStatus("like")
        }

    }

    const dislikeHandler = (postToLoad, postLikeStatus) => {
        let likeInfo = {
            like_status: "dislike"
        }

        if (postLikeStatus === "dislike") {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id)).then(() => (
                dispatch(likeActions.loadLikesPostThunk(postToLoad.id))
            ))

            setPostLikeStatus("neutral")
        } else {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id)).then(() => {
                dispatch(likeActions.createDislikePostThunk(likeInfo, postToLoad.id)).then(() => (
                    dispatch(likeActions.loadLikesPostThunk(postToLoad.id))
                ))
            })

            setPostLikeStatus('dislike')
        }
    }
    // -------------------------------------------------------------------------------------------------- //

    // ----------------------------------------- Components ---------------------------------------------- //
    // Function to load the post footer
    const loadFooter = (currentUser, postToLoad, subredditToLoad) => {
        if (currentUser.id === postToLoad["user_id"]) {
            return (
                <section onClick={() => setLoadEditPostComponent(true)} id="post-page-post-footer-container">
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
    // function to handle editing a post
    const loadEditPostSection = (postToLoad) => {
        if (newPostBody === null && postToLoad.body) {
            setNewPostBody(postToLoad.body)
        }

        return (
            <form id="post-page-edit-main-container" onSubmit={updatePost}>
                <section id="post-page-edit-input-container">
                    <textarea id="post-page-edit-input"
                        type="text"
                        minLength={1}
                        value={newPostBody}
                        onChange={(e) => setNewPostBody(e.target.value)}
                    >
                    </textarea>
                    <section id="post-page-edit-button-container">
                        <button id="post-page-edit-cancel-button" onClick={() => setLoadEditPostComponent(false)}>
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
    // -------------------------------------------------------------------------------------------------- //

    const LoadOnePost = () => {
        // Figuring out if the subreaddit has the post of a particular ID. If it doesn't exist, then return an error page
        if (currentPost.length === 0 || Object.values(currentSubreddit[0])[0]["id"] !== Object.values(currentPost[0])[0]["subreddit_id"]) {
            return (
                <div className="black-background">
                    <ErrorPage />
                </div>
            )
        }

        const postToLoad = Object.values(currentPost[0])[0]
        const postImage = Object.values(postToLoad["images"])

        let userToLoad = -1;
        if(allUsers[1]) {
            userToLoad = allUsers[1][postToLoad["user_id"]]
        }

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
                        {/* Left container is the part of the post that contains the like functionality of posts */}
                        <aside id="post-page-post-left-container">
                            {/* Upvote button and function to handle clicking it */}
                            <aside onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (currentUser === -1) {
                                    setAskUserToLogin(true)
                                } else {
                                    likeHandler(postToLoad, postLikeStatus, e)
                                }
                            }} id="post-upvote-button">
                                <i id={`post-like-status-${postLikeStatus}`} className="fa-solid fa-up-long fa-lg" />
                            </aside>
                            {/* Displays like totals */}
                            <aside id="post-vote-counter">{likeTotal}</aside>
                            {/* Downvote button and function to handle clicking it */}
                            <aside onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (currentUser === -1) {
                                    setAskUserToLogin(true)
                                } else {
                                    dislikeHandler(postToLoad, postLikeStatus)
                                }
                            }} id="post-downvote-button">
                                <i id={`post-dislike-status-${postLikeStatus}`} className="fa-solid fa-down-long fa-lg" />
                            </aside>
                        </aside>
                        {/* Right container is the main body of the post: title, body text, image, etc. */}
                        <aside id="post-page-post-right-container">
                            {/* header container contains the post's information: poster, subreaddit belonging to, etc. */}
                            <section id="post-page-post-header-container">
                                <aside onClick={(e) => redirectToSubredditPage(subredditToLoad["name"], history, e)} id="post-page-post-header">
                                    r/{subredditToLoad.name}
                                </aside>
                                <aside id="post-page-post-poster-decoration-text">
                                    Posted by
                                </aside>
                                <aside id="post-page-post-poster" onClick={(e) => redirectToUserPage(userToLoad.username, history, e)}>
                                    u/{userToLoad.username}
                                </aside>
                            </section>
                            <section id="post-page-post-title-container">
                                <section id="post-page-post-title">
                                    {postToLoad.title}
                                </section>
                            </section>
                            {/* body container contains the meat of the post: text and image */}
                            <section id="post-page-post-body-container">
                                {loadEditPostComponent ? (
                                    <section>
                                        {loadEditPostSection(postToLoad)}
                                    </section>
                                ) : (
                                    <section id="post-page-post-body">
                                        {postToLoad.body}
                                    </section>
                                )}
                            </section>
                            <section id="post-page-post-image-container">
                                {postImage.length > 0 ? (
                                    <img src={`${postImage["0"]["image_url"]}`}
                                        width={650}
                                    ></img>
                                ) : (
                                    <div></div>
                                )}
                            </section>
                            <section>
                                {loadFooter(currentUser, postToLoad, subredditToLoad)}
                            </section>
                            {/* <aside id="post-page-comments-form-container">
                                {currentUser !== -1 ? (
                                    <div>
                                        {createCommentComponent(currentUser)}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </aside> */}
                            {/* <aside id="post-page-comments-section-container">
                                {loadComments(currentUser, subredditToLoad)}
                            </aside> */}
                        </aside>
                    </aside>
                    <aside onClick={(e) => redirectToSubredditPage(subredditToLoad["name"], history, e)} id="post-page-bar-main-container">
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

    // return (
    //     <div id="post-page-background-1">
    //         {/* {askUserToLogin && (
    //             <Modal>
    //                 {LogInOrSignUpModal({ setAskUserToLogin })}
    //             </Modal>
    //         )} */}
    //         {LoadOnePost()}
    //     </div>
    // )

    console.log('booba',currentSubreddit.length, allUsers.length, currentPostLikes.length, load)

    return currentSubreddit.length > 0 && allUsers.length > 1 && currentPostLikes.length > 0 && load ? (
        <div id="post-page-background-1">
            {askUserToLogin && (
                <Modal>
                    {LogInOrSignUpModal({ setAskUserToLogin })}
                </Modal>
            )}
            {LoadOnePost()}
        </div>
    ) : (
        <div></div>
    )
}

export default PostBody
