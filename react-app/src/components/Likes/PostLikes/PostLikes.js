import "./PostLikes.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as likeActions from "../../../store/like"


// helper function
const calculatePostLikes = (post) => {
    let likes = 0;
    let dislikes = 0;

    let likesArray = [];
    if(post.post.likes) {
        likesArray = Object.values(post.post.likes)
    }

    if (likesArray.length > 0) {
        likesArray.forEach(el => {
            if (el.like_status === "like") {
                likes++
            }
            else if (el.like_status === "dislike") {
                dislikes++
            }
        })
        return likes - dislikes
    } else {
        return "Vote"
    }
}

const PostLikes = (post) => {
    const postId = post.post.id

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(likeActions.loadLikesPostThunk(postId))
    }, [dispatch])
    const postLikes = Object.values(useSelector(likeActions.loadPostLikes))


    return postLikes.length > 0 ? (
        <div id="likes-main-container">
            <aside id="likes-upvote-button">
                <i className="fa-solid fa-up-long fa-lg" />
            </aside>
            <aside id="likes-vote-counter">{calculatePostLikes(post)}</aside>
            <aside id="likes-downvote-button">
                <i className="fa-solid fa-down-long fa-lg" />
            </aside>
        </div>
    ) : (
        <div></div>
    )
}

export default PostLikes
