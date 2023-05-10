import "./PostComments.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as commentActions from "../../../../store/comment"

import redirectToUserPage from "../../../HelperFunctions/redirectToUserPage";

const PostComments = ({ currentPost, currentSubreddit, allUsers, currentUser, post_id, load }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([])
    const [commentBody, setCommentBody] = useState("")
    const [newCommentBody, setNewCommentBody] = useState(null)
    const [loadEditCommentComponent, setLoadEditCommentComponent] = useState(false)
    // const [askUserToLogin, setAskUserToLogin] = useState(false)


    useEffect(() => {
        dispatch(commentActions.loadPostCommentsThunk(post_id))
    }, [dispatch])

    const currentComments = Object.values(useSelector(commentActions.loadAllComments))
    // console.log('booba test', currentComments)


    // ----------------------------------------- Functions ---------------------------------------------- //
    // Comment Update
    const updateComment = async (e, el) => {
        e.preventDefault();

        let commentInfo = {
            body: newCommentBody
        }

        dispatch(commentActions.putCommentThunk(commentInfo, el))
        el.body = commentInfo.body

        setLoadEditCommentComponent(false)
    }
    // Comment Removal/Deletion
    const handleCommentDelete = (el) => {
        const confirmDelete = prompt(
            `Are you sure you want to delete this comment? You can't undo this`, "Yes"
        )

        if (confirmDelete === "Yes") {
            console.log('booba test action', el)
            dispatch(commentActions.deleteCommentThunk(el))
        }
    }
    const handleCommentRemoval = (el) => {
        const confirmDelete = prompt(
            `Are you sure you want to remove this comment? You can't undo this`, "Yes"
        )

        if (confirmDelete === "Yes") {
            dispatch(commentActions.deleteCommentThunk(el))
        }
    }
    // -------------------------------------------------------------------------------------------------- //


    // ----------------------------------------- Components ---------------------------------------------- //
    const loadEditCommentSection = (commentToLoad) => {
        if (newCommentBody === null && commentToLoad.body) {
            setNewCommentBody(commentToLoad.body)
        }

        return (
            <form onSubmit={updateComment}>
                <textarea
                    type="text"
                    minLength={1}
                    value={newCommentBody}
                    onChange={(e) => setNewCommentBody(e.target.value)}
                >
                </textarea>
                <section>
                    <button onClick={() => setLoadEditCommentComponent(false)}>
                        Cancel
                    </button>
                    <button type="submit">
                        Save Edits
                    </button>
                </section>

            </form>
        )
    }

    const CommentsComponent = () => {
        if (currentComments.length > 0) {
            const commentsToLoad = Object.values(currentComments[0])

            return (
                Array.isArray(commentsToLoad) && commentsToLoad.map((el, i) => {
                    let commentPoster = -1;
                    if (allUsers[1]) {
                        commentPoster = allUsers[1][el["user_id"]]
                    }

                    let commentDate = el["created_at"].split(" ")
                    commentDate = commentDate[2] + " " + commentDate[1] + ", " + commentDate[3]

                    return (
                        <div id='comments-section-main-container' key={i}>
                            <section id="comments-section-header">
                                <img id="comments-section-poster-profile-pic"
                                    src={commentPoster["profile_image"]}
                                    width={30}
                                    height={30}
                                    alt="commentPosterProfileImage"
                                />
                                <aside onClick={(e) => redirectToUserPage(commentPoster.username, history, e)} id="comments-section-poster-username">
                                    {commentPoster["username"]}
                                </aside>
                                <aside>
                                    -
                                </aside>
                                <aside id="comments-section-date">
                                    {commentDate}
                                </aside>
                            </section>
                            <section id="comments-section-comment">
                                {loadEditCommentComponent ? (
                                    <section>
                                        {loadEditCommentSection(el)}
                                    </section>
                                ) : (
                                    <section>
                                        {el["body"]}
                                    </section>
                                )}
                            </section>
                            <section id="comments-section-footer">
                                {/* TO DO: Implement a comment edit function */}
                                {/* <aside onClick={() => setLoadEditCommentComponent(true)} id="comments-edit-container">
                                    {
                                        currentUser["id"] === el["user_id"] ? (
                                            <div id="comments-footer-create-comment">
                                                <i className="fa-solid fa-pen" />
                                                <aside>
                                                    Edit
                                                </aside>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                </aside> */}
                                {currentUser === -1 ? (
                                    <div id="comments-remove-no-user"></div>
                                ) : (
                                    <aside id="comments-remove-container">
                                        {currentUser["id"] === el["user_id"] ? (
                                            <div id="comments-footer-delete-comment" onClick={() => handleCommentDelete(el)}>
                                                <i className="fa-regular fa-trash-can" />
                                                <aside className="comments-footer-text">
                                                    Delete Comment
                                                </aside>
                                            </div>
                                        ) : (
                                            <div id="comments-footer-remove-comment" onClick={() => handleCommentRemoval(el)}>
                                                <i className="fa-solid fa-ban" />
                                                <aside className="comments-footer-text">
                                                    Remove Comment
                                                </aside>
                                            </div>
                                        )}
                                    </aside>
                                )}
                            </section>
                        </div>
                    )
                })
            )
        } else {
            return (
                <div id='comments-section-no-comments'>
                    There are no comments yet. Why don't you fix that?
                </div>
            )
        }
    }
    // -------------------------------------------------------------------------------------------------- //


    // ----------------------------------------- Main Component ----------------------------------------- //
     return currentSubreddit.length > 0 && currentComments.length > 0 && currentPost.length > 0 && allUsers.length > 0 && load ? (
        <div>
                <aside id="post-page-comments-section-container">
                    {CommentsComponent()}
                </aside>
            </div>
    ) : (
        <div></div>
    )
}

export default PostComments
