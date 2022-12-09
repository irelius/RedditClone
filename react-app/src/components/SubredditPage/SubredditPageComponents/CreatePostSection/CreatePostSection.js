import "./CreatePostSection.css"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import * as subredditActions from "../../../../store/subreddit"
import { useHistory } from "react-router-dom"

const CreatePostSection = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [load, setLoad] = useState(false)

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        setLoad(true)
        return () => dispatch(subredditActions.clearSubreddit())
    }, [dispatch])

    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const currentUser = useSelector(state => state.session.user)

    const redirectPost = (subredditToLoad) => {
        return history.push(`/r/${subredditToLoad.name}/new`)
    }

    const LoadCreatePost = () => {
        const subredditToLoad = Object.values(currentSubreddit[0])[0]

        return currentUser ? (
            <section id="create-post-main-container">
                <aside id="create-post-user-profile-container">
                    <img id="create-post-user-profile-pic" src={currentUser.profile_image}
                        width={40}
                        height={40}
                    />
                </aside>
                <aside id="create-post-input-container">
                    <button onClick={() => redirectPost(subredditToLoad)} id="create-post-button">
                        Create Post
                    </button>
                </aside>
            </section>
        ) : (
            <div></div>
        )

    }


    return currentSubreddit.length > 0 && load ? (
        <div>
            {LoadCreatePost()}
        </div>
    ) : (
        <div></div>
    )
}

export default CreatePostSection
