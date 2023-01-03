import "./TestPage.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as commentActions from "../../store/comment"
import * as userActions from "../../store/session"
import * as likeActions from "../../store/like"

const TestPage = () => {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    const subreddit_name = "Subreddit_1"
    const post_id = 1

    useEffect(() => {
        dispatch(commentActions.loadPostCommentsThunk(post_id))
        setLoad(true)
    }, [dispatch])

    const testComments = useSelector(commentActions.loadAllComments)




    const LoadTestPage = () => {
        return (
            <div id="test">
                hello
            </div>
        )
    }


    return load ? (
        <div>
            {LoadTestPage()}
        </div>
    ) : (
        <div></div>
    )
}

export default TestPage
