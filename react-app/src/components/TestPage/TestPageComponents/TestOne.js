import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../../store/session"

import * as commentActions from "../../../store/comment"
import * as likeActions from "../../../store/like"

import TestTwo from "./TestTwo";

const TestOne = (dispatch) => {
    const testId = 1;

    // const [test, setTest] = useState(true)

    // const testDispatch = dispatch(likeActions.loadLikesCommentThunk(testId))

    return (
        <div>
            booba
        </div>
    )



    // const dispatch = useDispatch()

    // const [state, setState] = useState(false)

    // const post_id = 5

    // useEffect(() => {
    //     dispatch(commentActions.loadPostCommentsThunk(post_id))
    //     dispatch(likeActions.loadAllCommentLikesPerPostThunk(post_id))

    //     setState(true)

    //     return (() => {
    //         dispatch(commentActions.clearComment())
    //         dispatch(likeActions.clearLikes())
    //     })
    // }, [dispatch])

    // const users = Object.values(useSelector(state => state.session))
    // const currentComments = Object.values(useSelector(commentActions.loadAllComments))
    // const commentLikes = Object.values(useSelector(likeActions.loadLikes))[0]


    // // console.log('booba', '\n', commentLikes, '\n', currentComments)


    // const testComponent = () => {

    //     return (
    //         currentComments.map((el, i) => {
    //             return (
    //                 <div>
    //                     booba
    //                 </div>
    //             )
    //         })
    //     )
    // }


    // return state && currentComments.length > 0 ? (
    //     <div className="test">
    //         {testComponent()}
    //     </div>
    // ) : (
    //     <div></div>
    // )
}


export default TestOne
