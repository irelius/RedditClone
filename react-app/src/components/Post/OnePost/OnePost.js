import "./OnePost.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as subredditActions from "../../../store/subreddit"
import * as postActions from "../../../store/post"
import * as userActions from "../../../store/session"

// helper function
const calculatePostLikes = (post) => {
    let likes = 0;
    let dislikes = 0;

    let likesArray = [];
    if (post.likes) {
        likesArray = Object.values(post.likes)
    }

    if (likesArray.length > 0) {
        likesArray.forEach(el => {
            if (el.like_status === "like") {
                likes++
            }
            else if (el.like_status === "dislike") {
                dislikes++
            }
        })
        return likes - dislikes
    }
    return likes
}

const OnePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const [newPostBody, setNewPostBody] = useState(null)
    const [loadEditComponent, setLoadEditComponent] = useState(false)
    const { subreddit_name, post_id } = useParams();

    useEffect(() => {
        dispatch(postActions.loadPostThunk(post_id))
        dispatch(subredditActions.loadCurrentSubredditThunk(subreddit_name))
        dispatch(userActions.loadAllUserThunk())
        setLoad(true)
        dispatch(subredditActions.clearSubreddit())
        return () => dispatch(postActions.clearPost())
    }, [dispatch, setLoadEditComponent, setNewPostBody])

    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(state => state.session))

    const redirectToSubreddit = (subredditToLoad) => {
        history.push(`/r/${subredditToLoad.name}`)
    }

    const handlePostDelete = () => {
        const postToDelete = currentPost[0]

        const confirmDelete = prompt(
            `Are you sure you want to delete your post? You can't undo this`, "Yes"
        )

        if (confirmDelete === "Yes") {
            dispatch(postActions.deletePostThunk(postToDelete))
            history.goBack();
        }
    }

    const redirectToUserPage = (username, e) => {
        e.stopPropagation();

        history.push(`/users/${username}`)
    }


    const handlePostRemove = () => {
        const postToDelete = currentPost[0]
        dispatch(postActions.deletePostThunk(postToDelete))
        history.goBack();
    }

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
            console.log("test2")
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

    const LoadOnePost = () => {
        const postToLoad = currentPost[0]
        const subredditToLoad = Object.values(currentSubreddit[0])[0]
        const userToLoad = allUsers[1][postToLoad["user_id"]]
        const currentUser = allUsers[0]
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
                            {/* COMMENT IN: Like function */}
                            {/* <aside id="post-upvote-button">
                                <i className="fa-solid fa-up-long fa-lg" />
                            </aside>
                            <aside id="post-vote-counter">{calculatePostLikes(postToLoad)}</aside>
                            <aside id="post-downvote-button">
                                <i className="fa-solid fa-down-long fa-lg" />
                            </aside> */}
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


    return currentPost.length > 0 && currentSubreddit.length > 0 && allUsers.length > 1 && load ? (
        <div id="post-page-background">
            {LoadOnePost()}
        </div>
    ) : (
        <div></div>
    )


}

export default OnePost
