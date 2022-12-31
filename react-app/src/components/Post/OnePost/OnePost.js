import "./OnePost.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as subredditActions from "../../../store/subreddit"
import * as postActions from "../../../store/post"
import * as userActions from "../../../store/session"
import * as likeActions from "../../../store/like"


const OnePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const [newPostBody, setNewPostBody] = useState(null)
    const [loadEditComponent, setLoadEditComponent] = useState(false)
    const [postLikedStatus, setPostLikedStatus] = useState("post-like-status-neutral")
    const [postDislikedStatus, setPostDislikedStatus] = useState("post-dislike-status-neutral")

    const [test, setTest] = useState("neutral")
    const [modifier, setModifier] = useState(0)

    const [likeTotal, setLikeTotal] = useState(0)

    const { subreddit_name, post_id } = useParams();

    useEffect(() => {
        dispatch(likeActions.loadLikesPostThunk(post_id))
        dispatch(subredditActions.loadCurrentSubredditThunk(subreddit_name))
        dispatch(postActions.loadPostThunk(post_id))
        dispatch(userActions.loadAllUserThunk())
        setLoad(true)
        dispatch(subredditActions.clearSubreddit())
        dispatch(likeActions.clearLikes())
        return () => dispatch(postActions.clearPost())
    }, [dispatch, setLoadEditComponent, setNewPostBody])

    const currentPostLikes = Object.values(useSelector(likeActions.loadPostLikes))
    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(state => state.session))

    useEffect(() => {
        if (currentPostLikes.length > 0 && load) {
            const currentUser = allUsers[0] || -1
            const likesArray = Object.values(currentPostLikes[0]["likes"])
            const dislikesArray = Object.values(currentPostLikes[0]["dislikes"])

            likesArray.forEach(el => {
                if (el["user_id"] === currentUser.id) {
                    setPostLikedStatus("post-like-status-like")
                    setTest('like')
                }
            })
            dislikesArray.forEach(el => {
                if (el["user_id"] === currentUser.id) {
                    setPostDislikedStatus("post-dislike-status-dislike")
                    setTest('dislike')
                }
            })
            setLikeTotal(currentPostLikes[0]["likes_total"])
        }
    }, [dispatch, currentPostLikes])


    // Redirection
    const redirectToSubreddit = (subredditToLoad) => {
        history.push(`/r/${subredditToLoad.name}`)
    }
    const redirectToUserPage = (username, e) => {
        e.stopPropagation();

        history.push(`/users/${username}`)
    }
    //


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


    // Like/Dislike Handling

    const likeHandler = (postToLoad, test) => {
        console.log("booba handler entered", test)
        let likeInfo = {
            like_status: "like"
        }

        if(test === "like") {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))

            setTest("neutral")
            setModifier(0)
        } else {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
            dispatch(likeActions.createLikePostThunk(likeInfo, postToLoad.id))

            setTest("like")
            setModifier(1)
        }

    }

    const dislikeHandler = (postToLoad, test) => {
        let likeInfo = {
            like_status: "dislike"
        }

        if(test === "dislike") {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))

            setTest("neutral")
            setModifier(0)
        } else {
            dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
            dispatch(likeActions.createDislikePostThunk(likeInfo, postToLoad.id))

            setTest('dislike')
            setModifier(-1)
        }

    }

    // const likePost = async (postToLoad) => {
    //     // error handling to undo dislike if it exists
    //     let likeInfo = {
    //         like_status: "like"
    //     }

    //     if (postDislikedStatus === "post-dislike-status-dislike") {
    //         setPostDislikedStatus("post-dislike-status-neutral")
    //         setPostLikedStatus("post-like-status-like")

    //         dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
    //         dispatch(likeActions.createLikePostThunk(likeInfo, postToLoad.id))
    //         // ????
    //         setLikeTotal(currentPostLikes[0]["likes_total"])
    //         return
    //     }
    //     if (postLikedStatus === "post-like-status-neutral") {
    //         setPostDislikedStatus("post-dislike-status-neutral")
    //         setPostLikedStatus("post-like-status-like")

    //         dispatch(likeActions.createLikePostThunk(likeInfo, postToLoad.id))
    //         setLikeTotal(currentPostLikes[0]["likes_total"])
    //         return
    //     }
    //     if (postLikedStatus === "post-like-status-like") {
    //         setPostDislikedStatus("post-dislike-status-neutral")
    //         setPostLikedStatus("post-like-status-neutral")

    //         dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
    //         setLikeTotal(currentPostLikes[0]["likes_total"])
    //         return
    //     }
    // }

    // const dislikePost = async (postToLoad) => {
    //     // error handling to undo like if it exists
    //     let likeInfo = {
    //         like_status: "dislike"
    //     }

    //     if (postLikedStatus === "post-like-status-like") {
    //         setPostLikedStatus("post-like-status-neutral")
    //         setPostDislikedStatus("post-dislike-status-dislike")

    //         dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
    //         dispatch(likeActions.createDislikePostThunk(likeInfo, postToLoad.id))
    //         setLikeTotal(currentPostLikes[0]["likes_total"])
    //         return
    //     }
    //      if (postDislikedStatus === "post-dislike-status-neutral") {
    //         setPostLikedStatus("post-like-status-neutral")
    //         setPostDislikedStatus("post-dislike-status-dislike")

    //         dispatch(likeActions.createDislikePostThunk(likeInfo, postToLoad.id))
    //         setLikeTotal(currentPostLikes[0]["likes_total"])
    //         return
    //     }
    //      if (postDislikedStatus === "post-dislike-status-dislike") {
    //         setPostLikedStatus("post-like-status-neutral")
    //         setPostDislikedStatus("post-dislike-status-neutral")

    //         dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
    //         setLikeTotal(currentPostLikes[0]["likes_total"])
    //         return
    //     }
    // }
    //



    // Components
    const loadFooter = (userToLoad, currentUser, postToLoad, subredditToLoad) => {
        if (currentUser.id === postToLoad.user_id) {
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
            <div id="post-page-asdf">
                <div id="post-page-close-button-container">
                    <button onClick={() => history.goBack()} id="post-page-close-button">
                        <i className="fa-solid fa-xmark fa-lg" />
                        Close
                    </button>
                </div>
                <div id="post-page-main-container">
                    <aside id="post-page-post-main-container">
                        <aside id="post-page-post-left-container">
                            {/* <aside onClick={() => likePost(postToLoad)} id="post-upvote-button">
                                <i id={postLikedStatus} className="fa-solid fa-up-long fa-lg" />
                            </aside>
                            <aside id="post-vote-counter">{likeTotal}</aside>
                            <aside onClick={() => dislikePost(postToLoad)} id="post-downvote-button">
                                <i id={postDislikedStatus} className="fa-solid fa-down-long fa-lg" />
                            </aside> */}
                            <aside onClick={() => likeHandler(postToLoad, test)} id="post-upvote-button">
                                <i id={'post-like-status-'+test} className="fa-solid fa-up-long fa-lg" />
                            </aside>
                            <aside id="post-vote-counter">{likeTotal + modifier}</aside>
                            <aside onClick={() => dislikeHandler(postToLoad, test)} id="post-downvote-button">
                                <i id={'post-dislike-status-'+test} className="fa-solid fa-down-long fa-lg" />
                            </aside>
                        </aside>
                        <aside id="post-page-post-right-container">
                            <section id="post-page-post-header-container">
                                <aside onClick={() => redirectToSubreddit(subredditToLoad)} id="post-page-post-header">
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
                            {loadFooter(userToLoad, currentUser, postToLoad, subredditToLoad)}
                        </aside>
                    </aside>
                    <aside onClick={() => redirectToSubreddit(subredditToLoad)} id="post-page-bar-main-container">
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
                <div id="post-page-comments-main-container">
                    {/* TO DO: Implement a comments section component that will return a default "no messages yet" section or the comments, o boy, that's gunna be hard */}
                </div>

            </div >
        )
    }

    return currentPost.length > 0 && currentSubreddit.length > 0 && allUsers.length > 1 && currentPostLikes.length > 0 && load ? (
        <div id="post-page-background">
            {LoadOnePost()}
        </div>
    ) : (
        <div></div>
    )


}

export default OnePost
