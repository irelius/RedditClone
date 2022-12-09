import "./EditPostSection.css"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import * as postActions from "../../../../../store/post"

// This file is uncessary?


const EditPostSection = (post) => {
    const dispatch = useDispatch()
    const history = useHistory

    useEffect(() => {
        dispatch(postActions.loadPostThunk(postToLoad.id))
        return () => dispatch(postActions.clearPost())
    }, [dispatch])

    const postToLoad = post.post
    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    let urlRedirect = window.location.href.split("/")
    urlRedirect = urlRedirect[3] + "/" + urlRedirect[4] + "/" + urlRedirect[5]

    const [edit, setEdit] = useState(postToLoad.body)

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
