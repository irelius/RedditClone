import { useContext } from "react"
import { LikesContext } from "../../../../../context/LikesContext"

import * as sessionActions from "../../../../../store/session"

const AllPostsUpVoteComponent = ({ dispatch }) => {
    const { postLikeStatus } = useContext(LikesContext)

    console.log("booba up vote", postLikeStatus)


    // const dispatch = useDispatch()

    // const likeHandler = (post, postLikeStatus, e) => {
    //     e.preventDefault()
    //     e.stopPropagation()

    //     let postId = post["id"]

    //     let likeInfo = {
    //         like_status: "like"
    //     }

    //     if (postLikesStatus === "like") {
    //         dispatch(likeActions.deleteLikePostThunk(postId))
    //         return postLikeStatus = "neutral"
    //     } else {
    //         dispatch(likeActions.deleteLikePostThunk(postId)).then(() => (
    //             dispatch(likeActions.createLikePostThunk(likeInfo, postId))
    //         ))
    //         return postLikeStatus = "like"
    //     }
    // }

    // return (
    //     <div onClick={(e) => {likeHandler(post, postLikesStatus, e)}}>
    //         U
    //     </div>
    // )

    return (
        <div>
            U
        </div>
    )
}

export default AllPostsUpVoteComponent
