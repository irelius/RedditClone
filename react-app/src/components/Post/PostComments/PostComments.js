import "./PostComments.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as commentActions from "../../../store/comment"
import * as userActions from "../../../store/session"
import * as likeActions from "../../../store/like"

const PostComments = (currentComments, allUsers, currentUser, subredditToLoad) => {
    const history = useHistory()
    const dispatch = useDispatch()
    allUsers = allUsers[1]

    // TO DO: try to figure out how to get the date time to work to show how long ago a comment was made from "today"

    // useEffect(() => {

    // }, [dispatch])

    const redirectUser = (userName) => {
        history.push(`/users/${userName}`)
    }

    const handleCommentDelete = (el) => {
        const confirmDelete = prompt(
            `Are you sure you want to delete this comment? You can't undo this`, "Yes"
        )

        if(confirmDelete === "Yes") {
            dispatch(commentActions.deleteCommentThunk(el))
        }
    }
    const handleCommentRemoval = (el) => {
        const confirmDelete = prompt(
            `Are you sure you want to remove this comment? You can't undo this`, "Yes"
        )

        if(confirmDelete === "Yes") {
            dispatch(commentActions.deleteCommentThunk(el))
        }
    }

    const loadFooter = (el) => {
        if (currentUser["id"] === el["user_id"]) {
            return (
                <div id="asdf" onClick={() => handleCommentDelete(el)}>
                    <aside>
                        <i className="fa-regular fa-trash-can"></i>
                    </aside>
                    <aside>
                        Delete Comment
                    </aside>
                </div>
            )
        }
        if (currentUser["id"] === subredditToLoad["admin_id"]) {
            return (
                <div onClick={() => handleCommentRemoval(el)}>
                    <aside>
                        <i className="fa-solid fa-ban"></i>
                    </aside>
                    <aside>
                        Remove Comment
                    </aside>
                </div>
            )
        }
    }


    if (currentComments.length > 0) {
        currentComments = Object.values(currentComments[0])
        return (
            Array.isArray(currentComments) && currentComments.map((el, i) => {
                const commentPoster = allUsers[el["user_id"]]
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
                            <aside onClick={() => redirectUser(commentPoster.username)} id="comments-section-poster-username">
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
                            {el["body"]}
                        </section>
                        <section id="comments-section-footer">
                            {loadFooter(el)}
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

export default PostComments
