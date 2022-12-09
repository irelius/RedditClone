import "./SubredditsBar.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import * as subredditActions from "../../store/subreddit"

const SubredditsBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(subredditActions.loadSubredditsThunk())
        return () => dispatch(subredditActions.clearSubreddit())
    }, [dispatch])

    const handlePush = (id, name) => {
        return history.push(`/r/${name}`)
    }

    const popularSubreddits = Object.values(useSelector(subredditActions.loadAllSubreddit))

    const loadPopularSubreddits = () => {
        const subredditsToLoad = Object.values(popularSubreddits[0])
        return (
            Array.isArray(subredditsToLoad) && subredditsToLoad.map((el, i) => {
                return (
                    <section id="subredditsbar-body-container" key={i}>
                        <section id="subredditsbar-subreddit-container">
                            <section onClick={() => handlePush(el.id, el.name)} id="subredditsbar-subreddit-name">
                                r/{el.name}
                            </section>
                        </section>
                    </section>
                )
            })
        )
    }

    return popularSubreddits.length > 0 ? (
        <div id="subredditsbar-main-container">
            <section id="subredditsbar-header-container">
                Reddit Communities
            </section>
            {loadPopularSubreddits()}
        </div>
    ) : (
        <div>
            Please wait
        </div>
    )
}

export default SubredditsBar;
