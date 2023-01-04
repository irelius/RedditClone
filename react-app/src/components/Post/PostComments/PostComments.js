import "./PostComments.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as commentActions from "../../../store/comment"
import * as userActions from "../../../store/session"
import * as likeActions from "../../../store/like"

const PostComments = (currentComments, allUsers) => {
    allUsers = allUsers[1]

    // TO DO: try to figure out how to get the date time to work to show how long ago a comment was made from "today"

    if (currentComments.length > 0) {
        currentComments = Object.values(currentComments[0])
        return (
            Array.isArray(currentComments) && currentComments.map(el => {
                const commentPoster = allUsers[el["user_id"]]
                let commentDate = el["created_at"].split(" ")
                commentDate = commentDate[2] + " " + commentDate[1] + ", " + commentDate[3]

                console.log("chooba", el)

                return (
                    <div id='comments-section-main-container'>
                        <section id="comments-section-poster-container">
                            <img id="comments-section-poster-profile-pic"
                                src={commentPoster["profile_image"]}
                                width={30}
                                height={30}
                                alt="commentPosterProfileImage"
                            />
                            <aside id="comments-section-poster-username">
                                {commentPoster["username"]}
                            </aside>
                            <aside>
                                {commentDate}
                            </aside>

                        </section>
                        <section id="comments-section-comment">
                            {el["body"]}
                        </section>
                    </div>
                )
            })
        )
    } else {
        return (
            <div id='test'>
                There are no comments yet. Why don't you fix that?
            </div>
        )
    }
}

export default PostComments
