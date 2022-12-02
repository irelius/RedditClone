import "./SubredditCreateForm.css"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import * as subredditActions from "../../../store/subreddit"


const SubredditCreateForm = ({ setShowCreateSubredditModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [subredditName, setSubredditName] = useState("")
    const [subredditDescription, setSubredditDescription] = useState("")
    const [errors, setErrors] = useState([])

    const currentUser = useSelector(state => state.session.user)

    const createSubreddit = async (e) => {
        let subredditInfo = {
            name: subredditName,
            description: subredditDescription,
            admin_id: currentUser.id
        }

        e.preventDefault();
        const data = await dispatch(subredditActions.createSubredditThunk(subredditInfo))
        if(data) {
            setErrors(data)
        }
        setShowCreateSubredditModal(false)
        return history.push(`/r/${subredditName}`)
    }

    return (
        <form onSubmit={createSubreddit} id="subreddit-modal-main-container">
            <section id="header-container">
                <aside id="header-title">
                    Create a community
                </aside>
                <aside id="header-exit">
                    <button onClick={() => setShowCreateSubredditModal(false)} id="create-subreddit-modal-exit-button">
                        <i className="fa-solid fa-xmark fa-lg"></i>
                    </button>
                </aside>
            </section>
            <section id="name-container">
                <section>Name</section>
                <section>Community names including capitalization cannot be changed.</section>
            </section>
            <input id="subreddit-name-input-container"
                name="name"
                type="text"
                maxLength={21}
                value={subredditName}
                onChange={(e) => setSubredditName(e.target.value)}
            />
            <input id="subreddit-description-input-container"
                name="description"
                type="text"
                maxLength={500}
                value={subredditDescription}
                onChange={(e) => setSubredditDescription(e.target.value)}
            />
            <section id="footer-container">
                <button id="footer-create-subreddit-button" type="submit">
                    Create Community
                </button>
                <button onClick={() => setShowCreateSubredditModal(false)} id="footer-cancel-button">
                    Cancel
                </button>
            </section>
        </form>
    )
}

export default SubredditCreateForm;
