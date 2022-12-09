import "./SubredditEditForm.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import * as subredditActions from "../../../store/subreddit"

const SubredditEditForm = ({ setShowEditSubredditModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [newSubredditDescription, setNewSubredditDescription] = useState("")
    const [descriptionLength, setDescriptionLength] = useState(0)
    const [errors, setErrors] = useState([])

    const [load, setLoad] = useState(false)

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        setLoad(true)
        return () => dispatch(subredditActions.clearSubreddit())
    }, [dispatch])

    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))


    const editSubreddit = async (e) => {
        e.preventDefault();

        const subredditToEdit = Object.values(currentSubreddit[0])[0]

        let subredditInfo = {
            name: subredditToEdit.name,
            description: newSubredditDescription,
            admin_id: subredditToEdit.admin_id
        }

        dispatch(subredditActions.putSubredditThunk(subredditInfo, subredditToEdit))
        setShowEditSubredditModal(false)
        // TO DO IMPORTANT: Component doesn't properly udpate after the edit form is submitted
    }

    const loadInputLength = () => {
        return `${500 - descriptionLength} Characters remaining`
    }

    const editSubredditForm = () => {
        const subredditToEdit = Object.values(currentSubreddit[0])[0]

        return (
            <form onSubmit={editSubreddit} id="edit-subreddit-form-container">
                <section id="edit-subreddit-header">
                    Edit {subredditToEdit.name}'s description.
                </section>
                <section id="edit-subreddit-description-container">
                    <textarea id ="edit-subreddit-description-input"
                        name="description"
                        type="text"
                        placeholder={subredditToEdit.description}
                        maxLength={500}
                        value={newSubredditDescription}
                        onChange={(e) => {
                            setDescriptionLength(e.target.value.length)
                            setNewSubredditDescription(e.target.value)
                        }}
                    >
                    </textarea>
                </section>
                <section id="edit-subreddit-footer-container">
                    <aside id="edit-subreddit-details-container">
                        <section id="edit-subreddit-details">
                            {loadInputLength()}
                        </section>
                    </aside>
                    <aside id="edit-subreddit-buttons-container">
                        <button id="edit-subreddit-cancel" onClick={() => setShowEditSubredditModal(false)}>
                            Cancel
                        </button>
                        <button id="edit-subreddit-save" type="submit">
                            Save
                        </button>
                    </aside>
                </section>

            </form>
        )
    }

    // const [subredditDescription, setSubredditDescription] = useState("")

    return currentSubreddit.length > 0 && load ? (
        <div id="edit-subreddit-main-container">
            {editSubredditForm()}
        </div>
    ) : (
        <div></div>
    )
}

export default SubredditEditForm
