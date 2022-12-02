import "./SubredditPageBanner.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as subredditActions from "../../../../store/subreddit"


const SubredditPageBanner = () => {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        setLoad(true)
    }, [dispatch])

    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))

    const LoadSubredditBanner = () => {
        const subredditToLoad = Object.values(currentSubreddit[0])[0]

        return (
            <div id="subreddit-banner-main-container">
                <section id="subreddit-banner-body-top-container">

                </section>

                <section id="subreddit-banner-body-bottom-container">
                    <section id="subreddit-banner-body-left"></section>
                    <section id="subreddit-banner-body-middle">

                        <aside id="subreddit-banner-icon-container">
                            <section id="subreddit-banner-icon">
                                r/
                            </section>
                        </aside>
                        <aside id="subreddit-banner-name-container">
                            <section id="subreddit-banner-name">
                                {subredditToLoad.name}
                            </section>
                            <section id="subreddit-banner-r-name">
                                r/{subredditToLoad.name}
                            </section>
                        </aside>
                    </section>
                    <section id="subreddit-banner-body-right"></section>
                </section>
            </div >
        )
    }

    return currentSubreddit.length > 0 && load ? (
        <div id="subreddit-banner-return-div">
            {LoadSubredditBanner()}
        </div>
    ) : (
        <div></div>
    )
}

export default SubredditPageBanner;
