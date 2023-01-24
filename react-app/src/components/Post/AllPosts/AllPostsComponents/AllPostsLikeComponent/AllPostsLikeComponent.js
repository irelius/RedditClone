// This file is not in use. Could be possible to make this work, but I'm not sure how



import calculatePostLikes from "../../../../HelperFunctions/calculatePostLikes"
import * as likeActions from "../../../../../store/like"

import { useDispatch } from "react-redux"

const AllPostsLikeComponent = (post, currentUser, currentUserLikes) => {

    // const dispatch = useDispatch()

    // const postLikes = post["likes"]
    // const likesTotal = calculatePostLikes(post)

    // // Set the post's like status to neutral by default. Then search through the users likes and dislikes, and change the status accordingly
    // let postLikeStatus = "neutral"
    if (currentUserLikes[0]["likes"][post["id"]]) {
        // postLikeStatus = "like"
        console.log("test2", post)
    } else if (currentUserLikes[0]["dislikes"][post["id"]]) {
        // postLikeStatus = "dislike"
        console.log("test2", post)
    }

    // //Like/Dislike Handling
    // const likeHandler = async (post, postLikeStatus, e) => {
    //     e.preventDefault()
    //     e.stopPropagation()

    //     let likeInfo = {
    //         like_status: "like"
    //     }

    //     console.log("test1", postLikeStatus)

    //     if (postLikeStatus === "like") {
    //         console.log('test if entered')
    //         dispatch(likeActions.deleteLikePostThunk(post["id"]))
    //     } else {
    //         console.log('test else entered')
    //         dispatch(likeActions.deleteLikePost(post["id"])).then(() => {
    //             dispatch(likeActions.createLikePostThunk(likeInfo, post["id"]))
    //         })
    //     }
    // }

    // return (

    //     <div>
    //         <aside id="post-left-container">
    //             <aside id="post-upvote-button" onClick={(e) => {
    //                 // TO DO: This is all wrong, fix this into separate React components. This is just to make it work for now
    //                 if (currentUser === -1) {
    //                     e.stopPropagation()
    //                     // TO DO: put the login modal here
    //                 } else {
    //                     likeHandler(post, postLikeStatus, e)
    //                     postLikeStatus === "like" ? postLikeStatus = "neutral" : postLikeStatus = "like"
    //                     console.log("test2", postLikeStatus)
    //                 }
    //             }}>
    //                 <i className="fa-solid fa-up-long fa-lg" id={`post-like-status-${postLikeStatus}`} />
    //                 {/* <i className="fa-solid fa-up-long fa-lg" /> */}
    //             </aside>
    //             <aside id="post-vote-counter">{likesTotal}</aside>
    //             <aside id="post-downvote-button" onClick={(e) => {
    //                 // // TO DO: This is all wrong, fix this into separate React components. This is just to make it work for now
    //                 // if (currentUser === -1) {
    //                 //     e.stopPropagation()
    //                 //     // TO DO: put the login modal here
    //                 // } else {
    //                 //     dislikeHandler(el, e)
    //                 // }
    //             }}>
    //                 <i className="fa-solid fa-down-long fa-lg" id={`post-dislike-status-${postLikeStatus}`} />
    //                 {/* <i className="fa-solid fa-down-long fa-lg" /> */}
    //             </aside>
    //         </aside>
    //     </div>
    // )
}

export default AllPostsLikeComponent
