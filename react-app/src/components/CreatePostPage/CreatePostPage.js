import "./CreatePostPage.css"

import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as subredditActions from "../../store/subreddit"

const CreatePostPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [load, setLoad] = useState(false)
    const [postTitle, setPostTitle] = useState("")
    const [postBody, setPostBody] = useState("")
    const [postImage, setPostImage] = useState("")
    const [postVideo, setPostVideo] = useState("")

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(subredditActions.loadCurrentSubredditThunk(currentSubredditName))
        setLoad(true)
    }, [])

    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))

    const loadCreatePostForm = () => {
        const subredditToEdit = Object.values(currentSubreddit[0])[0]
        return (
            <div id="create-post-page-main-container">
                <aside id="create-post-container">
                    <section id="create-post-header-container">
                        <aside id="create-post-header">
                            Create a post for r/{subredditToEdit.name}
                        </aside>
                    </section>
                    <section id="create-post-form-container">
                        <form id="create-post-form">
                            <section id="create-post-form-title-container">
                                <aside>
                                    <input id="create-post-form-title"
                                        name="title"
                                        type="text"
                                        placeholder="Title"
                                        maxLength={300}
                                        value={postTitle}
                                        onChange={(e) => setPostTitle(e.target.value)}
                                    />
                                </aside>
                                <aside id="create-post-form-title-counter">
                                    {postTitle.length}/300
                                </aside>
                            </section>
                            <section id="create-post-form-body-container">
                                <textarea id="create-post-form-body"
                                    name="body"
                                    type="text"
                                    placeholder="Text (optional)"
                                    value={postBody}
                                    onChange={(e) => setPostBody(e.target.value)}
                                />
                            </section>
                            <section id="create-post-form-button-container">
                                <button type="submit" id="create-post-form-button">
                                    Post
                                </button>
                            </section>
                        </form>
                    </section>
                </aside>
                <aside id="create-post-bar-container">
                    booba
                </aside>
            </div>
        )
    }


    return currentSubreddit.length > 0 && load ? (
        <div>
            {loadCreatePostForm()}
        </div>
    ) : (
        <div></div>
    )
}

export default CreatePostPage;
