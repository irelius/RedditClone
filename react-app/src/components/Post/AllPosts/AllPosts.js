import "./AllPosts.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import * as postActions from "../../../store/post"
import * as subredditActions from "../../../store/subreddit"
import * as sessionActions from "../../../store/session"
import * as likeActions from "../../../store/like"

import calculatePostLikes from "../../HelperFunctions/calculatePostLikes";
import redirectToPostPage from "../../HelperFunctions/redirectToPostPage";

import AllPostsPostComponent from "./AllPostsComponents/AllPostsPostComponent/AllPostsPostComponent";

const AllPosts = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [load, setLoad] = useState(false)
    const [tempPostsLiked, setTempPostsLiked] = useState({})

    useEffect(() => {
        dispatch(sessionActions.loadAllUserThunk())
        dispatch(subredditActions.loadSubredditsThunk())
        dispatch(postActions.loadPostsThunk())
        dispatch(likeActions.loadUserLikesThunk())
        setTempPostsLiked((tempPostsLiked) => ({
            ...tempPostsLiked,
            ...currentUserLikes[0],
        }))

        setLoad(true)
        return (() => {
            dispatch(subredditActions.clearSubreddit())
            dispatch(postActions.clearPost())
            dispatch(likeActions.clearLikes())
        })
    }, [dispatch])

    const allPosts = Object.values(useSelector(postActions.loadAllPosts))
    const allSubreddits = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(sessionActions.loadAllUsers))
    const currentUserLikes = Object.values(useSelector(likeActions.loadLikes))


    // Like/Dislike Handling
    const likeHandler = async (post, postLikeStatus, e) => {
        e.preventDefault()
        e.stopPropagation()

        let updateValue = {
            "like": {},
            "dislike": {},
            "neutral": {}
        }

        let likeInfo = {
            like_status: "like"
        }

        if (postLikeStatus === "like") {
            dispatch(likeActions.deleteLikePostThunk(post["id"])).then(() => (
                dispatch(likeActions.loadLikesPostThunk(post["id"]))
            ))

            updateValue["neutral"][post['id']] = "neutral"
        } else {
            dispatch(likeActions.deleteLikePostThunk(post["id"]))
            dispatch(likeActions.createLikePostThunk(likeInfo, post["id"])).then(() => (
                dispatch(likeActions.loadLikesPostThunk(post["id"]))
            ))
            updateValue["like"][post['id']] = "like"
        }

        setTempPostsLiked(tempPostsLiked => ({
            ...tempPostsLiked,
            ...updateValue
        }))

        console.log('test', tempPostsLiked)
    }

    const dislikeHandler = (post, postLikeStatus, e) => {
        e.preventDefault()
        e.stopPropagation()

        let postId = post["id"]
        let updateValue = {}

        let likeInfo = {
            like_status: "dislike"
        }

        if (postLikeStatus === "dislike") {
            dispatch(likeActions.deleteLikePostThunk(post["id"]))
            updateValue["neutral"][post['id']] = "neutral"
        } else {
            dispatch(likeActions.deleteLikePostThunk(post["id"])).then(() => (
                dispatch(likeActions.createDislikePostThunk(likeInfo, post["id"])))
            )

            updateValue["dislike"][post['id']] = "dislike"
        }

        setTempPostsLiked(tempPostsLiked => ({
            ...tempPostsLiked,
            ...updateValue
        }))

        console.log('test', tempPostsLiked)
    }
    //


    // Functions
    const modifyLikeTotal = (post, likeTotal, postLikeStatus) => {
        let postId = post["id"]

        // if (tempPostsLiked.keys().length > 0) {
        //     if (tempPostsLiked["like"][postId] === "like") {
        //         return likeTotal + 1
        //     }
        //     if (tempPostsLiked["dislike"][postId] === "like") {
        //         return likeTotal + 1
        //     }
        // }

        if (tempPostsLiked["like"] === undefined) {

            if (tempPostsLiked[postId] === "like") {
                return likeTotal + 1
            }
            if (tempPostsLiked[postId] === "dislike") {
                return likeTotal - 1
            }
        } else {
            if (tempPostsLiked["like"][postId] === "like") {
                return likeTotal + 1
            }
            if (tempPostsLiked["dislike"][postId] === "like") {
                return likeTotal + 1
            }
        }


        return likeTotal
    }
    //

    // Main Component
    const LoadAllPosts = () => {
        const postsToLoad = Object.values(allPosts[0])
        const usersToLoad = allUsers[1]
        const subredditsToLoad = allSubreddits[0]
        const currentUser = allUsers[0] || -1

        const postLikesToLoad = {}


        return (
            Array.isArray(postsToLoad) && postsToLoad.map((el, i) => {
                const subredditId = el["subreddit_id"]
                const subredditInfo = subredditsToLoad[subredditId]

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

                const likeTotal = calculatePostLikes(el)

                // if (tempPostsLiked["like"] !== undefined) {
                //     // console.log("test", tempPostsLiked, el["id"])
                //     if (tempPostsLiked["like"][el["id"] + 1]) {
                //         postLikeStatus = "like"
                //         return
                //     }
                //     if (tempPostsLiked["neutral"][el["id"] + 1]) {
                //         postLikeStatus = "neutral"
                //         return
                //     }
                //     if (tempPostsLiked["dislike"][el["id"] + 1]) {
                //         postLikeStatus = "dislike"
                //         return
                //     }
                // }

                // if (tempPostsLiked["like"] === undefined) {
                //     postLikeStatus = tempPostsLiked[el["id"]]
                // } else {
                //     if(postLikeStatus["like"][el["id"]]) {
                //         console.log("test 3", postLikeStatus["like"][el["id"]])
                //         postLikeStatus = "like"
                //     }
                // }

                return (
                    <div id="all-posts-main-container" onClick={(e) => redirectToPostPage(subredditInfo["name"], el["id"], history, e)}>
                        <aside id="all-posts-left-section">
                            <aside id="post-upvote-button" onClick={(e) => {
                                // TO DO: try to separate this like functionality into separate React component
                                if (currentUser === -1) {
                                    e.stopPropagation()
                                } else {
                                    likeHandler(el, postLikeStatus, e)
                                }
                            }}>
                                <i className="fa-solid fa-up-long fa-lg" id={`post-like-status-${postLikeStatus}`} />
                            </aside>
                            <aside id="post-vote-counter">{modifyLikeTotal(el, likeTotal, postLikeStatus)}</aside>
                            {/* <aside id="post-vote-counter">{likeTotal}</aside> */}
                            <aside id="post-downvote-button" onClick={(e) => {
                                // TO DO: try to separate this like functionality into separate React component
                                if (currentUser === -1) {
                                    e.stopPropagation()
                                } else {
                                    dislikeHandler(el, postLikeStatus, e)
                                }
                            }}>
                                <i className="fa-solid fa-down-long fa-lg" id={`post-dislike-status-${postLikeStatus}`} />
                            </aside>
                        </aside >
                        <aside id="all-posts-right-section">
                            {AllPostsPostComponent(el, usersToLoad, subredditsToLoad)}
                        </aside>
                    </div >
                )
            })
        )
    }



    // Old React component where everything was together
    // return (
    //     Array.isArray(postsToLoad) && postsToLoad.map((el, i) => {
    //         const posterId = el["user_id"]
    //         const posterInfo = usersToLoad[posterId]

    //         const subredditId = el["subreddit_id"]
    //         const subredditInfo = subredditsToLoad[subredditId]

    //         let postLikeStatus = "neutral"
    //         let postLikes = Object.values(el["likes"])
    //         postLikes.forEach(el => {
    //             if (el["user_id"] === currentUser["id"] && el["like_status"] === "like") {
    //                 postLikeStatus = "like"
    //                 postLikesToLoad[el["id"]] = "like"
    //             }
    //             if (el["user_id"] === currentUser["id"] && el["like_status"] === "dislike") {
    //                 postLikeStatus = "dislike"
    //                 postLikesToLoad[el["id"]] = "dislike"
    //             }
    //         })

    //         const likeTotal = calculatePostLikes(el)

    //         if (tempPostsLiked[el["id"]]) {
    //             postLikeStatus = tempPostsLiked[el["id"]]
    //         }
    //         return (
    //             <div onClick={(e) => redirectToPostPage(el, e)} id="post-main-container" key={i}>
    //                 {/* Liking Section */}
    //                 <aside id="post-left-container">
    //                     <aside id="post-upvote-button" onClick={(e) => {
    //                         // TO DO: This is all wrong, fix this into separate React components. This is just to make it work for now
    //                         if (currentUser === -1) {
    //                             e.stopPropagation()
    //                         } else {
    //                             likeHandler(el, e)
    //                         }
    //                     }}>
    //                         <i className="fa-solid fa-up-long fa-lg" id={`post-like-status-${postLikeStatus}`} />
    //                     </aside>
    //                     <aside id="post-vote-counter">{modifyLikeTotal(el, likeTotal)}</aside>
    //                     <aside id="post-downvote-button" onClick={(e) => {
    //                         // TO DO: This is all wrong, fix this into separate React components. This is just to make it work for now
    //                         if (currentUser === -1) {
    //                             e.stopPropagation()
    //                         } else {
    //                             dislikeHandler(el, e)
    //                         }
    //                     }}>
    //                         <i className="fa-solid fa-down-long fa-lg" id={`post-dislike-status-${postLikeStatus}`} />
    //                     </aside>
    //                 </aside>
    //                 {/* Post Body Section */}
    //                 <aside id="post-right-container">
    //                     <section id="post-header-container">
    //                         <aside>
    //                             {subredditInfo ? (
    //                                 <section id="post-header-subreddit-information" onClick={(e) => redirectToSubredditPage(subredditInfo.name, e)}>
    //                                     r/{subredditInfo.name}
    //                                 </section>
    //                             ) : (
    //                                 <section id="post-header-no-subreddit">
    //                                     Subreddit does not exist.
    //                                 </section>
    //                             )}
    //                         </aside>
    //                         <aside id="post-header-poster-information">
    //                             Posted by
    //                             <section id="post-header-poster" onClick={(e) => redirectToUserPage(posterInfo.username, e)}>
    //                                 u/{posterInfo.username}
    //                             </section>
    //                         </aside>
    //                         {/* <aside id="post-header-join-container">
    //                         </aside> */}
    //                     </section>
    //                     <section id="post-body-container">
    //                         <section id="post-title">
    //                             {el.title}
    //                         </section>
    //                         <section id="post-body">
    //                             {el.body}
    //                         </section>
    //                     </section>
    //                     <section id="post-footer-container">
    //                         <aside id="post-footer-comments-container">
    //                             <aside>
    //                                 <i id="post-footer-comments-icon" className="fa-regular fa-message fa-lg" />
    //                             </aside>
    //                             <aside id="post-footer-comments">
    //                                 Comments
    //                             </aside>
    //                         </aside>
    //                         <aside id="post-footer-dots-container">
    //                             <i id="post-footer-dots-icon" className="fa-solid fa-ellipsis" />
    //                         </aside>
    //                     </section>
    //                 </aside>
    //             </div>
    //         )


    return allPosts.length > 0 && allUsers.length > 1 && allSubreddits.length > 0 && currentUserLikes.length > 0 && load ? (
        <div>
            {LoadAllPosts()}
        </div>
    ) : (
        <div>
        </div>
    )

}

export default AllPosts;
