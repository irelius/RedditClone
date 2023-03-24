import "./PostsIndividual.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { Modal } from "../../context/Modal";

import LogInOrSignUpModal from "../Modals/LogInOrSignUpModal/LogInOrSignUpModal";

import * as subredditActions from "../../store/subreddit"
import * as postActions from "../../store/post"
import * as userActions from "../../store/session"
import * as likeActions from "../../store/like"
import * as commentActions from "../../store/comment"

// import redirectToPostPage from "../../HelperFunctions/redirectToPostPage";
import redirectToSubredditPage from "../HelperFunctions/redirectToSubredditPage";
import redirectToUserPage from "../HelperFunctions/redirectToUserPage"
import ErrorPage from "../ErrorPage";
import PostBody from "./PostComponents/PostBody";


const PostsIndividual = () => {
    // const dispatch = useDispatch()
    // const history = useHistory()
    // const [load, setLoad] = useState(false)
    // const [errors, setErrors] = useState([])
    // const [newPostBody, setNewPostBody] = useState(null)
    // const [loadEditPostComponent, setLoadEditPostComponent] = useState(false)
    // const [commentBody, setCommentBody] = useState("")
    // const [newCommentBody, setNewCommentBody] = useState(null)
    // const [loadEditCommentComponent, setLoadEditCommentComponent] = useState(false)
    // const [askUserToLogin, setAskUserToLogin] = useState(false)

    // const [likeTotal, setLikeTotal] = useState(0)
    // const [postLikeStatus, setPostLikeStatus] = useState("neutral")

    // const { subreddit_name, post_id } = useParams();

    // useEffect(() => {
    //     dispatch(userActions.loadAllUserThunk())
    //     dispatch(subredditActions.loadCurrentSubredditThunk(subreddit_name))
    //     dispatch(postActions.loadPostThunk(post_id))
    //     dispatch(commentActions.loadPostCommentsThunk(post_id))
    //     dispatch(likeActions.loadLikesPostThunk(post_id))
    //     setLoad(true)

    //     return (() => {
    //         dispatch(subredditActions.clearSubreddit())
    //         dispatch(postActions.clearPost())
    //         dispatch(commentActions.clearComment())
    //         dispatch(likeActions.clearLikes())
    //     })

    // }, [dispatch, setLoadEditPostComponent, setNewPostBody, setLoadEditCommentComponent, setNewCommentBody])

    // const currentPostLikes = Object.values(useSelector(likeActions.loadPostLikes))
    // const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    // const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    // const currentComments = Object.values(useSelector(commentActions.loadAllComments))
    // const allUsers = Object.values(useSelector(state => state.session))

    // useEffect(() => {
    //     if (currentPostLikes.length > 0) {

    //         const currentUser = allUsers[0] || -1
    //         const likesArray = Object.values(currentPostLikes[0]["likes"])
    //         const dislikesArray = Object.values(currentPostLikes[0]["dislikes"])

    //         likesArray.forEach(el => {
    //             if (el["user_id"] === currentUser["id"]) {
    //                 setPostLikeStatus('like')
    //             }
    //         })
    //         dislikesArray.forEach(el => {
    //             if (el["user_id"] === currentUser["id"]) {
    //                 setPostLikeStatus('dislike')
    //             }
    //         })

    //         if (likesArray.length === 0 && dislikesArray.length === 0) {
    //             setPostLikeStatus("neutral")
    //         }

    //         setLikeTotal(currentPostLikes[0]["likes_total"])
    //     }

    // }, [currentPostLikes])
    // //


    // // Post Update
    // const updatePost = async (e) => {
    //     e.preventDefault();

    //     const postToEdit = currentPost[0]

    //     let postInfo = {
    //         title: postToEdit.title,
    //         body: newPostBody
    //     }

    //     dispatch(postActions.putPostThunk(postInfo, postToEdit))
    //     currentPost[0].body = postInfo.body

    //     setLoadEditPostComponent(false)
    // }
    // //


    // // Post Removal/Deletion
    // const handlePostDelete = (e) => {
    //     e.stopPropagation()
    //     const postToDelete = currentPost[0]
    //     const confirmDelete = prompt(
    //         `Are you sure you want to delete your post? You can't undo this`, "Yes"
    //     )

    //     if (confirmDelete === "Yes") {
    //         dispatch(postActions.deletePostThunk(postToDelete))
    //         history.goBack()
    //     }
    // }
    // const handlePostRemove = (e) => {
    //     e.stopPropagation()
    //     const postToDelete = currentPost[0]

    //     const confirmDelete = prompt(
    //         `Are you sure you want to remove this post? You can't undo this`, "Yes"
    //     )

    //     if (confirmDelete === "Yes") {
    //         dispatch(postActions.deletePostThunk(postToDelete))
    //         history.goBack();
    //     }
    // }
    // //

    // // Comment Creation
    // const createComment = async (e) => {
    //     e.preventDefault();
    //     let postId = Object.values(currentPost[0])

    //     let currentSubredditId = Object.keys(currentSubreddit[0])[0] || null
    //     let currentPostId = postId[0]["id"] || null
    //     let currentCommentId = null

    //     let commentInfo = {
    //         body: commentBody,
    //         subreddit_id: currentSubredditId,
    //         reply_to_id: currentCommentId,
    //         post_id: currentPostId,
    //     }

    //     const data = await dispatch(commentActions.createCommentThunk(commentInfo, postId[0]["id"]))
    //     if (data) {
    //         setErrors(data)
    //     }

    //     if (data === null) {
    //         dispatch(commentActions.loadPostCommentsThunk(post_id))
    //     }

    //     setCommentBody("")
    // }

    // // Comment Update
    // const updateComment = async (e, el) => {
    //     e.preventDefault();

    //     let commentInfo = {
    //         body: newCommentBody
    //     }

    //     dispatch(commentActions.putCommentThunk(commentInfo, el))
    //     el.body = commentInfo.body

    //     setLoadEditCommentComponent(false)
    // }

    // // Comment Removal/Deletion
    // const handleCommentDelete = (el) => {
    //     const confirmDelete = prompt(
    //         `Are you sure you want to delete this comment? You can't undo this`, "Yes"
    //     )

    //     if (confirmDelete === "Yes") {
    //         dispatch(commentActions.deleteCommentThunk(el))
    //     }
    // }
    // const handleCommentRemoval = (el) => {
    //     const confirmDelete = prompt(
    //         `Are you sure you want to remove this comment? You can't undo this`, "Yes"
    //     )

    //     if (confirmDelete === "Yes") {
    //         dispatch(commentActions.deleteCommentThunk(el))
    //     }
    // }
    // //


    // // Like/Dislike Handling
    // const likeHandler = async (postToLoad, postLikeStatus, e) => {
    //     let likeInfo = {
    //         like_status: "like"
    //     }

    //     if (postLikeStatus === "like") {
    //         dispatch(likeActions.deleteLikePostThunk(postToLoad.id)).then(() => (
    //             dispatch(likeActions.loadLikesPostThunk(postToLoad.id))
    //         ))

    //         setPostLikeStatus("neutral")
    //     } else {
    //         dispatch(likeActions.deleteLikePostThunk(postToLoad.id))
    //         dispatch(likeActions.createLikePostThunk(likeInfo, postToLoad.id)).then(() => (
    //             dispatch(likeActions.loadLikesPostThunk(postToLoad.id))
    //         ))

    //         setPostLikeStatus("like")
    //     }

    // }

    // const dislikeHandler = (postToLoad, postLikeStatus) => {
    //     let likeInfo = {
    //         like_status: "dislike"
    //     }

    //     if (postLikeStatus === "dislike") {
    //         dispatch(likeActions.deleteLikePostThunk(postToLoad.id)).then(() => (
    //             dispatch(likeActions.loadLikesPostThunk(postToLoad.id))
    //         ))

    //         setPostLikeStatus("neutral")
    //     } else {
    //         dispatch(likeActions.deleteLikePostThunk(postToLoad.id)).then(() => {
    //             dispatch(likeActions.createDislikePostThunk(likeInfo, postToLoad.id)).then(() => (
    //                 dispatch(likeActions.loadLikesPostThunk(postToLoad.id))
    //             ))
    //         })

    //         setPostLikeStatus('dislike')
    //     }
    // }


    // // Components
    // const loadFooter = (currentUser, postToLoad, subredditToLoad) => {
    //     if (currentUser.id === postToLoad["user_id"]) {
    //         return (
    //             <section onClick={() => setLoadEditPostComponent(true)} id="post-page-post-footer-container">
    //                 <aside id="post-page-post-edit-container">
    //                     <aside id="post-page-post-button-icon">
    //                         <i className="fa-regular fa-pen-to-square fa-lg" />
    //                     </aside>
    //                     <button id="post-page-post-edit-button">
    //                         Edit Post
    //                     </button>
    //                 </aside>
    //                 <aside onClick={handlePostDelete} id="post-page-post-delete-container">
    //                     <aside id="post-page-post-button-icon">
    //                         <i className="fa-solid fa-trash-can fa-lg" />
    //                     </aside>
    //                     <button id="post-page-post-delete-button">
    //                         Delete Post
    //                     </button>
    //                 </aside>
    //             </section>
    //         )
    //     } else if (currentUser.id === subredditToLoad.admin_id) {
    //         return (
    //             <section id="post-page-post-footer-container">
    //                 <aside onClick={handlePostRemove} id="post-page-post-delete-container">
    //                     <aside id="post-page-post-button-icon">
    //                         <i className="fa-solid fa-ban fa-lg" />
    //                     </aside>
    //                     <button id="post-page-post-delete-button">
    //                         Remove Post
    //                     </button>
    //                 </aside>
    //             </section>
    //         )
    //     } else {
    //         return (
    //             <div></div>
    //         )
    //     }
    // }
    // const loadEditPostSection = (postToLoad) => {
    //     if (newPostBody === null && postToLoad.body) {
    //         setNewPostBody(postToLoad.body)
    //     }

    //     return (
    //         <form id="post-page-edit-main-container" onSubmit={updatePost}>
    //             <section id="post-page-edit-input-container">
    //                 <textarea id="post-page-edit-input"
    //                     type="text"
    //                     minLength={1}
    //                     value={newPostBody}
    //                     onChange={(e) => setNewPostBody(e.target.value)}
    //                 >
    //                 </textarea>
    //                 <section id="post-page-edit-button-container">
    //                     <button id="post-page-edit-cancel-button" onClick={() => setLoadEditPostComponent(false)}>
    //                         Cancel
    //                     </button>
    //                     <button id="post-page-edit-save-button" type="submit">
    //                         Save
    //                     </button>
    //                 </section>
    //             </section>
    //         </form>
    //     )
    // }

    // const loadEditCommentSection = (commentToLoad) => {
    //     if (newCommentBody === null && commentToLoad.body) {
    //         setNewCommentBody(commentToLoad.body)
    //     }

    //     return (
    //         <form onSubmit={updateComment}>
    //             <textarea
    //                 type="text"
    //                 minLength={1}
    //                 value={newCommentBody}
    //                 onChange={(e) => setNewCommentBody(e.target.value)}
    //             >
    //             </textarea>
    //             <section>
    //                 <button onClick={() => setLoadEditCommentComponent(false)}>
    //                     Cancel
    //                 </button>
    //                 <button type="submit">
    //                     Save Edits
    //                 </button>
    //             </section>

    //         </form>
    //     )
    // }

    // const loadComments = (currentUser) => {
    //     if (currentComments.length > 0) {
    //         const commentsToLoad = Object.values(currentComments[0])

    //         return (
    //             Array.isArray(commentsToLoad) && commentsToLoad.map((el, i) => {

    //                 let commentPoster = allUsers[1][el["user_id"]]
    //                 let commentDate = el["created_at"].split(" ")
    //                 commentDate = commentDate[2] + " " + commentDate[1] + ", " + commentDate[3]

    //                 return (
    //                     <div id='comments-section-main-container' key={i}>
    //                         <section id="comments-section-header">
    //                             <img id="comments-section-poster-profile-pic"
    //                                 src={commentPoster["profile_image"]}
    //                                 width={30}
    //                                 height={30}
    //                                 alt="commentPosterProfileImage"
    //                             />
    //                             <aside onClick={(e) => redirectToUserPage(commentPoster.username, history, e)} id="comments-section-poster-username">
    //                                 {commentPoster["username"]}
    //                             </aside>
    //                             <aside>
    //                                 -
    //                             </aside>
    //                             <aside id="comments-section-date">
    //                                 {commentDate}
    //                             </aside>
    //                         </section>
    //                         <section id="comments-section-comment">
    //                             {loadEditCommentComponent ? (
    //                                 <section>
    //                                     {loadEditCommentSection(el)}
    //                                 </section>
    //                             ) : (
    //                                 <section>
    //                                     {el["body"]}
    //                                 </section>
    //                             )}
    //                         </section>
    //                         <section id="comments-section-footer">
    //                             {/* TO DO: Implement a comment edit function */}
    //                             <aside onClick={() => setLoadEditCommentComponent(true)} id="comments-edit-container">
    //                                 {
    //                                     currentUser["id"] === el["user_id"] ? (
    //                                         <div id="comments-footer-create-comment">
    //                                             <i className="fa-solid fa-pen" />
    //                                             <aside>
    //                                                 Edit
    //                                             </aside>
    //                                         </div>
    //                                     ) : (
    //                                         <div></div>
    //                                     )
    //                                 }
    //                             </aside>
    //                             {currentUser === -1 ? (
    //                                 <div id="comments-remove-no-user"></div>
    //                             ) : (
    //                                 <aside id="comments-remove-container">
    //                                     {currentUser["id"] === el["user_id"] ? (
    //                                         <div id="comments-footer-delete-comment" onClick={() => handleCommentDelete(el)}>
    //                                             <i className="fa-regular fa-trash-can" />
    //                                             <aside className="comments-footer-text">
    //                                                 Delete Comment
    //                                             </aside>
    //                                         </div>
    //                                     ) : (
    //                                         <div id="comments-footer-remove-comment" onClick={() => handleCommentRemoval(el)}>
    //                                             <i className="fa-solid fa-ban" />
    //                                             <aside className="comments-footer-text">
    //                                                 Remove Comment
    //                                             </aside>
    //                                         </div>
    //                                     )
    //                                     }
    //                                 </aside>
    //                             )}
    //                         </section>
    //                     </div>
    //                 )
    //             })
    //         )
    //     } else {
    //         return (
    //             <div id='comments-section-no-comments'>
    //                 There are no comments yet. Why don't you fix that?
    //             </div>
    //         )
    //     }
    // }

    // const createCommentComponent = (currentUser) => {
    //     return (
    //         <div id="create-comment-main-container">
    //             <section id="create-comment-commenter-container">
    //                 <aside>
    //                     Comment as
    //                 </aside>
    //                 <aside id="create-comment-commenter-name">
    //                     {currentUser["username"]}
    //                 </aside>
    //             </section>
    //             <section id="create-comment-form-container">
    //                 <form onSubmit={createComment} id="create-comment-form">
    //                     <section id="create-comment-form-body-container">
    //                         <textarea id="create-comment-form-body"
    //                             type="text"
    //                             placeholder="What are your thoughts?"
    //                             minLength={1}
    //                             value={commentBody}
    //                             onChange={(e) => {
    //                                 setCommentBody(e.target.value)
    //                                 setErrors([])
    //                             }}
    //                         />
    //                     </section>
    //                     <section id="create-comment-form-button-container">
    //                         <aside id="create-comment-error-container">
    //                             {errors.map((error, ind) => (
    //                                 <div key={ind}>{error}</div>
    //                             ))}
    //                         </aside>
    //                         <aside>
    //                             <button id="create-comment-submit-button" type="submit">
    //                                 Comment
    //                             </button>
    //                         </aside>
    //                     </section>
    //                 </form>
    //             </section>
    //         </div>
    //     )
    // }
    // //


    // // Main Component
    // const LoadOnePost = () => {
    //     // Figuring out if the subreaddit has the post of a particular ID. If it doesn't exist, then return an error page
    //     if (currentPost.length === 0 || Object.values(currentSubreddit[0])[0]["id"] !== Object.values(currentPost[0])[0]["subreddit_id"]) {
    //         return (
    //             <div className="black-background">
    //                 <ErrorPage />
    //             </div>
    //         )
    //     }

    //     const postToLoad = Object.values(currentPost[0])[0]
    //     const postImage = Object.values(postToLoad["images"])

    //     const userToLoad = allUsers[1][postToLoad["user_id"]]
    //     const currentUser = allUsers[0] || -1

    //     const subredditToLoad = Object.values(currentSubreddit[0])[0]
    //     let subredditDate = subredditToLoad.created_at.split(" ")
    //     subredditDate = subredditDate[2] + " " + subredditDate[1] + ", " + subredditDate[3]

    //     return (
    //         <div id="post-page-background-2">
    //             <div id="post-page-close-button-container">
    //                 <button onClick={() => history.goBack()} id="post-page-close-button">
    //                     <i className="fa-solid fa-xmark fa-lg" />
    //                     Close
    //                 </button>
    //             </div>
    //             <div id="post-page-main-container">
    //                 <aside id="post-page-post-main-container">
    //                     <aside id="post-page-post-left-container">
    //                         <aside onClick={(e) => {
    //                             e.preventDefault()
    //                             e.stopPropagation()
    //                             if (currentUser === -1) {
    //                                 setAskUserToLogin(true)
    //                             } else {
    //                                 likeHandler(postToLoad, postLikeStatus, e)
    //                             }
    //                         }} id="post-upvote-button">
    //                             <i id={`post-like-status-${postLikeStatus}`} className="fa-solid fa-up-long fa-lg" />
    //                         </aside>
    //                         <aside id="post-vote-counter">{likeTotal}</aside>
    //                         <aside onClick={(e) => {
    //                             e.preventDefault()
    //                             e.stopPropagation()
    //                             if (currentUser === -1) {
    //                                 setAskUserToLogin(true)
    //                             } else {
    //                                 dislikeHandler(postToLoad, postLikeStatus)
    //                             }
    //                         }} id="post-downvote-button">
    //                             <i id={`post-dislike-status-${postLikeStatus}`} className="fa-solid fa-down-long fa-lg" />
    //                         </aside>
    //                     </aside>
    //                     <aside id="post-page-post-right-container">
    //                         <section id="post-page-post-header-container">
    //                             <aside onClick={(e) => redirectToSubredditPage(subredditToLoad["name"], history, e)} id="post-page-post-header">
    //                                 r/{subredditToLoad.name}
    //                             </aside>
    //                             <aside id="post-page-post-poster-decoration-text">
    //                                 Posted by
    //                             </aside>
    //                             <aside id="post-page-post-poster" onClick={(e) => redirectToUserPage(userToLoad.username, history, e)}>
    //                                 u/{userToLoad.username}
    //                             </aside>
    //                         </section>
    //                         <section id="post-page-post-title-container">
    //                             <section id="post-page-post-title">
    //                                 {postToLoad.title}
    //                             </section>
    //                         </section>
    //                         <section id="post-page-post-body-container">
    //                             {loadEditPostComponent ? (
    //                                 <section>
    //                                     {loadEditPostSection(postToLoad)}
    //                                 </section>
    //                             ) : (
    //                                 <section id="post-page-post-body">
    //                                     {postToLoad.body}
    //                                 </section>
    //                             )}
    //                         </section>
    //                         <section id="post-page-post-image-container">
    //                             {postImage.length > 0 ? (
    //                                 <img src={`${postImage["0"]["image_url"]}`}
    //                                     width={650}
    //                                 ></img>
    //                             ) : (
    //                                 <div></div>
    //                             )}
    //                         </section>
    //                         <section>
    //                             {loadFooter(currentUser, postToLoad, subredditToLoad)}
    //                         </section>
    //                         <aside id="post-page-comments-form-container">
    //                             {currentUser !== -1 ? (
    //                                 <div>
    //                                     {createCommentComponent(currentUser)}
    //                                 </div>
    //                             ) : (
    //                                 <div></div>
    //                             )}
    //                         </aside>
    //                         <aside id="post-page-comments-section-container">
    //                             {loadComments(currentUser, subredditToLoad)}
    //                         </aside>
    //                     </aside>
    //                 </aside>
    //                 <aside onClick={(e) => redirectToSubredditPage(subredditToLoad["name"], history, e)} id="post-page-bar-main-container">
    //                     <section id="post-page-bar-banner">
    //                     </section>
    //                     <section id="post-page-bar-header-container">
    //                         <aside id="post-page-bar-icon">
    //                             r/
    //                         </aside>
    //                         <aside id="post-page-bar-header">
    //                             r/{subredditToLoad.name}
    //                         </aside>
    //                     </section>
    //                     <section id="post-page-bar-details-container">
    //                         <section id="post-page-bar-details-body">
    //                             {subredditToLoad.description}
    //                         </section>
    //                         <section id="post-page-bar-date">
    //                             Created {subredditDate}
    //                         </section>
    //                     </section>
    //                 </aside>
    //             </div>
    //         </div >
    //     )
    // }

    // return currentSubreddit.length > 0 && allUsers.length > 1 && currentPostLikes.length > 0 && load ? (
    //     <div id="post-page-background-1">
    //         {askUserToLogin && (
    //             <Modal>
    //                 {LogInOrSignUpModal({ setAskUserToLogin })}
    //             </Modal>
    //         )}
    //         {LoadOnePost()}
    //     </div>
    // ) : (
    //     <div></div>
    // )

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
        <div id="test">
            {/* {PostBody(currentPostLikes, currentPost, currentSubreddit, allUsers, currentUser)} */}
            {PostBody({currentPostLikes, currentPost, currentSubreddit, allUsers, currentUser, load})}
        </div>
    )
}

export default PostsIndividual
