import "./EditPostSection.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import * as postActions from "../../../../../store/post"


const EditPostSection = (post) => {
    const dispatch = useDispatch()
    const history = useHistory

    useEffect(() => {
        dispatch(postActions.loadPostThunk(postToLoad.id))
    }, [dispatch])

    const postToLoad = post.post
    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    let urlRedirect = window.location.href.split("/")
    urlRedirect = urlRedirect[3] + "/" + urlRedirect[4] + "/" + urlRedirect[5]

    const [edit, setEdit] = useState(postToLoad.body)

    const test = () => {
        history.push("/")
    }

    const handleSubmit = () => {
        return history.push("/r/Subreddit_1")
        // return <Redirect to="/" />
    }

    return (
        <div id="edit-post-main-container" >
            <section>

                <textarea
                    name="editPost"
                    type="text"
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                >
                    {edit}
                </textarea>
            </section>
            <section id="edit-post-buttons-container">
                <button onClick={() => test}>
                    test
                </button>
                <aside id="edit-post-cancel-button-container">
                    <button id="edit-post-cancel-button">
                        Cancel
                    </button>
                </aside>
                <aside id="edit-post-save-button-container">
                    <button id="edit-post-save-button">
                        Save
                    </button>
                </aside>

            </section>
        </div>
    )
}

export default EditPostSection
