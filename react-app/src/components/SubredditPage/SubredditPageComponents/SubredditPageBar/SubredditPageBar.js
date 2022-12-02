import "./SubredditPageBar.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as subredditActions from "../../../../store/subreddit"


const SubredditPageBar = () => {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        setLoad(true)
    }, [dispatch])

    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))

    const LoadSubredditPageBar = () => {
        const subredditToLoad = Object.values(currentSubreddit[0])[0]

        return (
            <div id="subreddit-bar-main-container">
                <section id="subreddit-bar-header-container">
                    <section id="subreddit-bar-header">
                        About Community
                    </section>
                </section>
                <section id="subreddit-bar-description-container">
                    <section id="subreddit-bar-description-body">
                        {subredditToLoad.description}
                    </section>
                </section>
                <section id="subreddit-bar-create-post-container">
                    <button id="subreddit-bar-create-post-button">
                        Create Post
                    </button>
                </section>
            </div>
        )
    }

    return currentSubreddit.length > 0 && load ? (
        <div>
            { LoadSubredditPageBar()}
        </div>
    ) : (
        <div></div>
    )
}

export default SubredditPageBar
