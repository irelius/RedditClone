import * as sessionActions from "../../store/session"
import * as likeActions from "../../store/like"

const postLikeHandler = (post, dispatch, postLikeStatus, e) => {
    e.preventDefault()
    e.stopPropagation()

    let likeInfo = {
        like_status: "like"
    }

    console.log("test", post, postLikeStatus)

    if (postLikeStatus === "like") {
        console.log('test if entered')
        dispatch(likeActions.deleteLikePostThunk(post["id"]))
    } else {
        console.log('test else entered')
        dispatch(likeActions.deleteLikePost(post["id"])).then(() => {
            dispatch(likeActions.createLikePostThunk(likeInfo, post["id"]))
        })
    }

}

export default postLikeHandler
