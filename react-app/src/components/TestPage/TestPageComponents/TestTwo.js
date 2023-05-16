import "./Testcss.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as commentActions from "../../../store/comment"
import * as likeActions from "../../../store/like"

const TestTwo = (el) => {
    // const commentsToLoad = Object.values(currentComments[0])
    console.log('booba asdf', el)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(likeActions.loadLikesCommentThunk(el.id))

        return (
            likeActions.clearLikes
        )
    }, [dispatch])

    const commentLikes = Object.values(likeActions.loadLikes)

    return (
        <div className="test">
            {el.body}
        </div>
    )
}

export default TestTwo
