import * as sessionActions from "../../store/session"
import * as likeActions from "../../store/like"

const postLikeHandler = (post, dispatch, postLikeStatus, e) => {
    e.preventDefault()
    e.stopPropagation()

    let likeInfo = {
        like_status: "like"
    }

    if (postLikeStatus === "like") {
        dispatch(likeActions.deleteLikePostThunk(post["id"]))
    } else {
        dispatch(likeActions.deleteLikePost(post["id"])).then(() => {
            dispatch(likeActions.createLikePostThunk(likeInfo, post["id"]))
        })
    }

}

export default postLikeHandler
