import "./SubredditCreateForm.css"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect, useHistory } from "react-router-dom"
import * as subredditActions from "../../../store/subreddit"


const SubredditCreateForm = ({ setShowCreateSubredditModal, setShowProfileMenu }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [subredditName, setSubredditName] = useState("")
    const [subredditDescription, setSubredditDescription] = useState("")
    const [subredditDescriptionLength, setSubbredditDescriptionLength] = useState(0)
    const [errors, setErrors] = useState([])

    const currentUser = useSelector(state => state.session.user)

    const createSubreddit = async (e) => {
        e.preventDefault();

        let prepSubredditName = subredditName.trim()
        prepSubredditName = prepSubredditName.split(" ").join("_")

        let subredditInfo = {
            name: prepSubredditName,
            description: subredditDescription,
            admin_id: currentUser.id
        }

        const data = await dispatch(subredditActions.createSubredditThunk(subredditInfo))
        if (data) {
            setErrors(data)
        }

        if (data === null) {
            setShowCreateSubredditModal(false)
            setShowProfileMenu(false)
            console.log('booba', prepSubredditName)
            history.push(`/r/${prepSubredditName}`)
            window.location.reload()
        }
    }

    return (
        <form onSubmit={createSubreddit} id="subreddit-modal-main-container">
            <section id="header-container-main-container">
                <aside id="header-title-container">
                    <section id="header-title">
                        Create a community
                    </section>
                </aside>
                <aside id="header-exit-container">
                    <button id="header-exit-button" onClick={() => {
                        setShowCreateSubredditModal(false)
                        setShowProfileMenu(false)
                    }}>
                        <i id="header-exit-icon" className="fa-solid fa-xmark fa-lg"></i>
                    </button>
                </aside>
            </section>
            <section id="header-name-container">
                <section id="header-name">Name</section>
                <section id="header-warning">Community names including capitalization cannot be changed.</section>
            </section>
            <section id="subreddit-name-input-main-container">
                <aside id="subreddit-name-input-r">
                    r/
                </aside>
                <input id="subreddit-name-input-container"
                    name="name"
                    type="text"
                    minLength={1}
                    maxLength={21}
                    value={subredditName}
                    onChange={(e) => {
                        setSubredditName(e.target.value)
                        setSubbredditDescriptionLength(e.target.value.length)
                    }}
                />
            </section>
            <section id="header-characters-remaining-container">
                <section id="header-characters-remaining">
                    {21 - subredditDescriptionLength} characters remaining
                </section>
            </section>
            <div id="header-error-container">
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <section id="header-description-container">
                <section id="header-description">Description (Optional)</section>
                <section id="header-warning">Give your community a description. This can be changed later.</section>
            </section>
            <section id="subreddit-description-input-main-container">
                <textarea id="subreddit-description-input"
                    name="description"
                    type="text"
                    maxLength={500}
                    value={subredditDescription}
                    onChange={(e) => setSubredditDescription(e.target.value)}
                />
            </section>
            <section id="footer-container">
                <button id="footer-cancel-button" onClick={() => {
                    setShowCreateSubredditModal(false)
                    setShowProfileMenu(false)
                }}>
                    Cancel
                </button>
                <button id="footer-create-subreddit-button" type="submit">
                    Create Community
                </button>
            </section>
        </form>
    )
}

export default SubredditCreateForm;
