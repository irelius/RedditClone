import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import * as subredditActions from "../../store/subreddit"
import * as postActions from "../../store/post"

import PostLikes from "../Likes/PostLikes"


const SubredditPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        dispatch(postActions.loadCurrentSubredditPostsThunk(currentSubredditName))
    }, [dispatch])

    // const currentSubreddit = Object.values(useSelector((subredditActions.loadAllSubreddit)))
    // const currentSubredditPosts = Object.values((useSelector((postActions.loadAllPosts))).posts)



    return (
        <div id="temporary">
            <section>
                temp
            </section>
            <section>
                temp
            </section>
            <section>
                temp
            </section>
            <section>
                temp
            </section>
            <section>
                {/* <PostLikes /> */}
            </section>

        </div>
    )
}

export default SubredditPage
