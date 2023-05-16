import "./IndividualComment.css"

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as likeActions from "../../../../../store/like"



const IndividualComment = (comment) => {
    // const commentId = comment.id

    const dispatch = useDispatch()
    const [commentLikeTotal, setCommentLikeTotal] = useState(0)

    // useEffect(() => {
    //     dispatch(likeActions.loadLikesCommentThunk(commentId))
    // }, [dispatch])

    // const commentLikes = Object.values(likeActions.loadLikes())
    // console.log('booba component', commentLikes)


    return (
        <div>
            booba
        </div>
    )
}

export default IndividualComment;
