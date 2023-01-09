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

    const [number, setNumber] = useState(1)

    useEffect(() => {
        dispatch(commentActions.loadCommentThunk(number))
        setLoad(true)
    }, [dispatch, number])

    const testComments = Object.values(useSelector(commentActions.loadAllComments))

    const LoadTestPage = () => {
        console.log("booba", testComments[0][number])
        return (
            <div id="test">
                <button onClick={() => setNumber(number + 1)}>
                    increase number {number}
                </button>
            </div>
        )
    }


    return testComments.length > 0 && testComments[0][number] && load ? (
        <div>
            {LoadTestPage()}
        </div>
    ) : (
        <div></div>
    )
}

export default TestPage
