import "./SubredditPagePosts.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { Modal } from "../../../../context/Modal";

import * as postActions from "../../../../store/post"
import * as subredditActions from "../../../../store/subreddit"
import * as sessionActions from "../../../../store/session"
import * as likeActions from "../../../../store/like"

import LogInOrSignUpModal from "../../../Modals/LogInOrSignUpModal/LogInOrSignUpModal";
import ErrorPage from "../../../ErrorPage";
import redirectToPostPage from "../../../HelperFunctions/redirectToPostPage";
import NoPostsToLoadComponent from "../../../NoPostsToLoadComponent";

import calculatePostLikes from "../../../HelperFunctions/calculatePostLikes";
import modifyLikeTotal from "../../../HelperFunctions/modifyLikeTotal";


const SubredditPagePosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [load, setLoad] = useState(false)
    const [initialPostLikeStatus, setInitialPostLikeStatus] = useState(false)
    const [initialPostLikes, setInitialPostLikes] = useState({})
    const [modifiedPostLikes, setModifiedPostLikes] = useState({})

    const [askUserToLogin, setAskUserToLogin] = useState(false)

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(sessionActions.loadAllUserThunk())
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        dispatch(postActions.loadCurrentSubredditPostsThunk(currentSubredditName))
        dispatch(likeActions.loadUserLikesThunk())

        setLoad(true)

        return () => {
            dispatch(subredditActions.clearSubreddit())
            dispatch(postActions.clearPost())
            dispatch(likeActions.clearLikes())
        }
    }, [dispatch])

    const currentSubredditPosts = Object.values(useSelector(postActions.loadAllPosts));
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(sessionActions.loadAllUsers))
    const currentUserLikes = Object.values(useSelector(likeActions.loadLikes))

    // Like/Dislike Handling
    const initialTempPostsLiked = () => {
        setInitialPostLikeStatus(true)

        let updateValue = {}

        let allUserDislikes;
        let allUserLikes;

        if (currentUserLikes.length > 0) {
            allUserLikes = Object.values(currentUserLikes[0]["likes"])
            allUserDislikes = Object.values(currentUserLikes[0]["dislikes"])
            allUserLikes.forEach(el => {
                if (el["post_id"]) {
                    updateValue[el["post_id"]] = el["like_status"]
                }
            })

            allUserDislikes.forEach(el => {
                if (el["post_id"]) {
                    updateValue[el["post_id"]] = el["like_status"]
                }
            })
            setInitialPostLikes(initialPostLikes => ({
                ...initialPostLikes,
                ...updateValue
            }))
        } else {
            allUserDislikes = null;
            allUserLikes = null;
        }


    }

    const likeHandler = (post, postLikeStatus, e) => {
        let likeInfo = {
            like_status: "like"
        }

        let updateValue = {}

        if (postLikeStatus === "like") {
            dispatch(likeActions.deleteLikePostThunk(post["id"]))
            updateValue[post["id"]] = "neutral"
        } else {
            dispatch(likeActions.deleteLikePostThunk(post["id"]))
            dispatch(likeActions.createLikePostThunk(likeInfo, post["id"]))
            updateValue[post["id"]] = "like"
        }

        setModifiedPostLikes(modifiedPostLikes => ({
            ...modifiedPostLikes,
            ...updateValue
        }))

    }

    const dislikeHandler = (post, postLikeStatus, e) => {
        let likeInfo = {
            like_status: "dislike"
        }

        let updateValue = {}

        if (postLikeStatus === "dislike") {
            dispatch(likeActions.deleteLikePostThunk(post["id"]))
            updateValue[post["id"]] = "neutral"
        } else {
            dispatch(likeActions.deleteLikePostThunk(post["id"]))
            dispatch(likeActions.createLikePostThunk(likeInfo, post["id"]))
            updateValue[post["id"]] = "dislike"
        }

        setModifiedPostLikes(modifiedPostLikes => ({
            ...modifiedPostLikes,
            ...updateValue
        }))
    }
    //


    // Main Component
    const LoadSubredditPagePosts = () => {
        const subredditPostsToLoad = Object.values(currentSubredditPosts[0])
        const usersToLoad = allUsers[1]
        const currentUser = allUsers[0] || -1

        const postLikesToLoad = {}

        if (!initialPostLikeStatus) {
            initialTempPostsLiked()
        }

        return (
            Array.isArray(subredditPostsToLoad) && subredditPostsToLoad.map((el, i) => {
                const posterId = el["user_id"]
                const posterInfo = usersToLoad[posterId]

                const subredditName = Object.values(currentSubreddit[0])[0]["name"]

                const postImage = Object.values(el["images"])

                // figure out like status of each post on the front page
                let postLikeStatus = "neutral"
                let postLikes = Object.values(el["likes"])
                postLikes.forEach(el => {
                    if (el["user_id"] === currentUser["id"] && el["like_status"] === "like") {
                        postLikeStatus = "like"
                        postLikesToLoad[el["id"]] = "like"
                    }
                    if (el["user_id"] === currentUser["id"] && el["like_status"] === "dislike") {
                        postLikeStatus = "dislike"
                        postLikesToLoad[el["id"]] = "dislike"
                    }
                })

                if (modifiedPostLikes[el["id"]]) {
                    postLikeStatus = modifiedPostLikes[el["id"]]
                }

                return (
                    <div key={i} onClick={(e) => redirectToPostPage(subredditName, el["id"], history, e)} id="subreddit-post-main-container">
                        <aside id="subreddit-post-left-container">
                            <aside id="subreddit-post-upvote-button" onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                if (currentUser === -1) {
                                    setAskUserToLogin(true)
                                } else {
                                    likeHandler(el, postLikeStatus, e)
                                }
                            }}>
                                <i className="fa-solid fa-up-long fa-lg" id={`post-like-status-${postLikeStatus}`} />
                            </aside>
                            <aside id="subreddit-post-vote-counter">{calculatePostLikes(el) + modifyLikeTotal(el, initialPostLikes, modifiedPostLikes)}</aside>
                            <aside id="subreddit-post-downvote-button" onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                if (currentUser === -1) {
                                    setAskUserToLogin(true)
                                } else {
                                    dislikeHandler(el, postLikeStatus, e)
                                }
                            }}>
                                <i className="fa-solid fa-down-long fa-lg" id={`post-dislike-status-${postLikeStatus}`} />
                            </aside>
                        </aside >
                        <aside id="subreddit-post-right-container">
                            <section id="subreddit-post-header-container">
                                Posted by
                                <aside id="subreddit-post-header-subreddit-post-information">
                                    u/{posterInfo.username}
                                </aside>
                                {/* <aside id="subreddit-post-header-join-container">
                            </aside> */}
                            </section>
                            <section id="subreddit-post-body-container">
                                <section id="subreddit-post-title">
                                    {el.title}
                                </section>
                                <section id="subreddit-post-body">
                                    {el.body}
                                </section>
                                {postImage.length > 0 ? (
                                    <section id="individual-post-image">
                                        <img src={`${postImage[0]["image_url"]}`}
                                            width={400}
                                        ></img>
                                    </section>
                                ) : (
                                    null
                                )}
                            </section>
                            <section id="subreddit-post-footer-container">
                                <aside id="subreddit-post-footer-comments">
                                    <aside>
                                        <i id="subreddit-post-footer-comments-icon" className="fa-regular fa-message fa-lg" />
                                    </aside>
                                    <aside>
                                        Comments
                                    </aside>
                                </aside>
                            </section>
                        </aside>
                    </div >
                )
            })
        )
    }

    return currentSubredditPosts.length > 0 && allUsers.length > 1 && load ? (
        <div>
            {askUserToLogin && (
                <Modal>
                    {LogInOrSignUpModal({ setAskUserToLogin })}
                </Modal>
            )}
            {LoadSubredditPagePosts()}
        </div>
    ) : currentSubreddit.length === 0 ? (
        <div>
            {ErrorPage()}
        </div>
    ) : (
        <div>
            {NoPostsToLoadComponent()}
        </div>
    )
}

export default SubredditPagePosts;
