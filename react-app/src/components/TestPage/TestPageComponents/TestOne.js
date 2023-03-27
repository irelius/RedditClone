import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../../store/session"

const TestOne = () => {
    const dispatch = useDispatch()

    const [state, setState] = useState(false)


    useEffect(() => {
        dispatch(userActions.loadAllUserThunk())
        setState(true)
    }, [dispatch])

    const users = Object.values(useSelector(state => state.session))


    return state ? (
        <div>
            hello
        </div>
    ) : (
        <div></div>
    )
}


export default TestOne
