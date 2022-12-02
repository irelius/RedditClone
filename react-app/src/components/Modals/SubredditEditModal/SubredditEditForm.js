import "./SubredditEditForm.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import * as subredditActions from "../../../store/subreddit"

const SubredditEditForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [newSubredditDescription, setNewSubredditDescription] = useState("")
    const [errors, setErrors] = useState([])

    const [load, setLoad] = useState(false)

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        setLoad(true)
    }, [dispatch])

    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))


    // const editSubreddit = async (e) => {
    //     const subredditToEdit = Object.values(currentSubreddit[0])[0]
    //     console.log("hello", subredditToEdit)

    //     let subredditInfo = {
    //         name: subredditToEdit.name,
    //         description: newSubredditDescription,
    //         admin_id: subredditToEdit.admin_id
    //     }

    //     e.preventDefault();

    //     return "testtest"
    // }

    const editSubredditForm = () => {
        const subredditToEdit = Object.values(currentSubreddit[0])[0]
        console.log("hello", subredditToEdit)

        return (
            <form id="edit-subreddit-main-container">
                <section id="edit-subreddit-description-container">
                    <input
                        name="description"
                        type="text"
                        maxLength={500}
                        value={subredditToEdit.description}
                        onChange={(e) => setNewSubredditDescription(e.target.value)}
                    >
                    </input>
                </section>
                <section id="edit-subreddit-footer-container">
                    <aside id="edit-subreddit-details-container">

                    </aside>
                    <aside id="edit-subreddit-buttons">
                        <button>
                            Cancel
                        </button>
                        <button type="submit">
                            Save
                        </button>
                    </aside>
                </section>

            </form>
        )
    }

    // const [subredditDescription, setSubredditDescription] = useState("")

    return currentSubreddit.length > 0 && load ? (
        <div>
            {editSubredditForm()}
        </div>
    ) : (
        <div></div>
    )
}

export default SubredditEditForm
