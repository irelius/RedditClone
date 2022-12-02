import "./SubredditPageBar.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import * as subredditActions from "../../../../store/subreddit"
import SubredditEditModal from "../../../Modals/SubredditEditModal"

const SubredditPageBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)


    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        setLoad(true)
    }, [dispatch])

    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const currentUser = useSelector(state => state.session.user)

    const handleSubredditDelete = () => {
        const subredditToDelete = Object.values(currentSubreddit[0])[0]

        const confirmDelete = prompt(
            `Are you sure you want to delete Subreddit ${Object.values(currentSubreddit[0])[0].name}?`, "Yes"
        )

        if (confirmDelete === "Yes") {
            dispatch(subredditActions.deleteSubredditThunk(subredditToDelete))
            return history.push("/")
        }
    }

    const loadDeleteButton = () => {

        if (currentUser.id === Object.values(currentSubreddit[0])[0].admin_id) {
            return (
                <button onClick={handleSubredditDelete}>
                    Delete Subreddit
                </button>
            )
        }
    }

    const loadEditButton = () => {
        if (currentUser.id === Object.values(currentSubreddit[0])[0].admin_id) {
            return (
                <SubredditEditModal />
            )
        }
    }

    const LoadSubredditPageBar = () => {
        const subredditToLoad = Object.values(currentSubreddit[0])[0]
        return (
            <div id="subreddit-bar-main-container">
                <section id="subreddit-bar-header-container">
                    <section id="subreddit-bar-header">
                        About Community
                    </section>
                    <section id="subreddit-bar-edit-container">
                        {loadEditButton()}
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
                <section id="subreddit-bar-delete-subreddit-container">
                    {loadDeleteButton()}
                </section>
            </div>
        )
    }

    return currentSubreddit.length > 0 && load ? (
        <div>
            {LoadSubredditPageBar()}
        </div>
    ) : (
        <div></div>
    )
}

export default SubredditPageBar
