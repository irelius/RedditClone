import "./SubredditPageBar.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Modal } from "../../../../context/Modal";
import SubredditEditForm from "../../../Modals/SubredditEditModal/SubredditEditForm";


import * as subredditActions from "../../../../store/subreddit"

const SubredditPageBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const [newSubredditDescription, setNewSubredditDescription] = useState(null)
    const [loadEditComponent, setLoadEditComponent] = useState(false)
    const [descriptionLength, setDescriptionLength] = useState(0)

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        setLoad(true)
        dispatch(subredditActions.clearSubreddit())
    }, [dispatch, setLoadEditComponent, setNewSubredditDescription])

    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const currentUser = useSelector(state => state.session.user) || -1

    const redirectPost = (subredditToLoad) => {
        return history.push(`/r/${subredditToLoad.name}/new`)
    }


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
                <button id="subreddit-bar-delete-subreddit-button" onClick={handleSubredditDelete}>
                    Delete Subreddit
                </button>
            )
        }
    }

    const loadInputLength = () => {
        return `${500 - descriptionLength} Characters remaining`
    }

    const updateSubredditDescription = async (e) => {
        e.preventDefault();

        const subredditToEdit = Object.values(currentSubreddit[0])[0]
        let subredditInfo = {
            name: subredditToEdit.name,
            description: newSubredditDescription,
            admin_id: subredditToEdit.admin_id
        }

        dispatch(subredditActions.putSubredditThunk(subredditInfo, subredditToEdit))
        Object.values(currentSubreddit[0])[0].description = subredditInfo.description

        setLoadEditComponent(false)
    }

    const loadEditSubredditSection = (subredditToLoad) => {
        if (newSubredditDescription === null && subredditToLoad.description) {
            setNewSubredditDescription(subredditToLoad.description)
        }

        return (
            <form id="subreddit-bar-edit-main-container" onSubmit={updateSubredditDescription}>
                <span id="subreddit-bar-edit-input-container">
                    <textarea id="subreddit-bar-edit-input"
                        type="text"
                        value={newSubredditDescription}
                        maxLength={500}
                        onChange={(e) => {
                            setNewSubredditDescription(e.target.value)
                            setDescriptionLength(e.target.value.length)
                        }}
                    >
                    </textarea>
                </span>
                <section id="subreddit-bar-edit-footer-container">
                    <aside id="subreddit-bar-edit-footer-length">
                        {loadInputLength()}
                    </aside>
                    <aside id="subreddit-bar-button-container">
                        <button id="subreddit-bar-cancel-button" onClick={() => setLoadEditComponent(false)}>
                            Cancel
                        </button>
                        <button id="subreddit-bar-save-button" type="submit">
                            Save
                        </button>
                    </aside>
                </section>
            </form>
        )
    }

    const LoadSubredditPageBar = () => {
        const subredditToLoad = Object.values(currentSubreddit[0])[0]
        let subredditDate = subredditToLoad.created_at.split(" ")
        subredditDate = subredditDate[2] + " " + subredditDate[1] + ", " + subredditDate[3]

        return (
            <div id="subreddit-bar-main-container">
                <section id="subreddit-bar-header-container">
                    <section id="subreddit-bar-header">
                        About Community
                    </section>
                    {currentUser.id === subredditToLoad.admin_id ? (
                        <section onClick={() => setLoadEditComponent(true)} id="subreddit-bar-edit-container">
                            <button id="subreddit-bar-edit-button-container">
                                <i id="subreddit-bar-edit-button" className="fa-regular fa-pen-to-square fa-lg" />
                            </button>
                        </section>
                    ) : (
                        <div></div>
                    )}
                </section>
                {loadEditComponent ? (
                    <div>
                        {loadEditSubredditSection(subredditToLoad)}
                    </div>
                ) : (
                    <div>
                        <section id="subreddit-bar-description-container">
                            <section id="subreddit-bar-description-body">
                                {subredditToLoad.description}
                            </section>
                            {/* <section>
                                {loadInputLength()}
                            </section> */}
                        </section>
                    </div>
                )}
                <section id="subreddit-bar-date-container">
                    <section id="subreddit-bar-date">
                        Created {subredditDate}
                    </section>
                </section>
                <section id="subreddit-bar-create-post-container">
                    <button onClick={() => redirectPost(subredditToLoad)} id="subreddit-bar-create-post-button">
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
