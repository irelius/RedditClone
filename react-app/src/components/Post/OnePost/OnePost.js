import "./OnePost.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"

import * as subredditActions from "../../../store/subreddit"
import * as postActions from "../../../store/post"

// helper function
const calculatePostLikes = (post) => {
    let likes = 0;
    let dislikes = 0;

    let likesArray = [];
    if (post.likes) {
        likesArray = Object.values(post.likes)
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
    }
    return likes
}

const OnePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [load, setLoad] = useState(false)
    const { subreddit_name, post_id } = useParams();

    useEffect(() => {
        dispatch(postActions.loadPostThunk(post_id))
        dispatch(subredditActions.loadCurrentSubredditThunk(subreddit_name))
        setLoad(true)
        return () => dispatch(postActions.clearPost())
    }, [dispatch])

    const currentPost = Object.values(useSelector(postActions.loadAllPosts))
    const currentSubreddit = Object.values(useSelector(subredditActions.loadAllSubreddit))

    const redirectToSubreddit = (subredditToLoad) => {
        history.push(`/r/${subredditToLoad.name}`)
    }

    const LoadOnePost = () => {
        const postToLoad = currentPost[0]
        const subredditToLoad = Object.values(currentSubreddit[0])[0]

        console.log('test1', postToLoad)
        console.log("test2", subredditToLoad)
        return (
            <div id="post-page-asdf">
                <div id="post-page-close-button-container">
                    <button onClick={() => history.goBack()} id="post-page-close-button">
                        <i className="fa-solid fa-xmark fa-lg" />
                        Close
                    </button>
                </div>
                <div id="post-page-main-container">
                    <aside id="post-page-post-main-container">
                        <aside id="post-page-post-left-container">
                            <aside id="post-upvote-button">
                                <i className="fa-solid fa-up-long fa-lg" />
                            </aside>
                            <aside id="post-vote-counter">{calculatePostLikes(postToLoad)}</aside>
                            <aside id="post-downvote-button">
                                <i className="fa-solid fa-down-long fa-lg" />
                            </aside>
                        </aside>
                        <aside id="post-page-post-right-container">
                            <section id="post-page-post-header-container">
                                <aside onClick={() => redirectToSubreddit(subredditToLoad)} id="post-page-post-header">
                                    r/{subredditToLoad.name}
                                </aside>
                                <aside id="post-page-post-poster-decoration-text">
                                    Posted by
                                </aside>
                                <aside id="post-page-post-poster">
                                    u/
                                </aside>
                            </section>
                            <section id="post-page-post-title-container">
                                <section id="post-page-post-title">
                                    {postToLoad.title}
                                </section>
                            </section>
                            <section id="post-page-post-body-container">
                                <section id="post-page-post-body">
                                    {postToLoad.body}
                                </section>
                            </section>
                            <section id="post-page-post-footer-container">
                                <aside id="post-page-post-edit-container">
                                    <aside id="post-page-post-button-icon">
                                        <i className="fa-regular fa-pen-to-square fa-lg" />
                                    </aside>
                                    <button id="post-page-post-edit-button">
                                        Edit Post
                                    </button>
                                </aside>
                                <aside id="post-page-post-delete-container">
                                    <aside id="post-page-post-button-icon">
                                        <i className="fa-solid fa-trash-can fa-lg" />
                                    </aside>
                                    <button id="post-page-post-delete-button">
                                        Delete Post
                                    </button>
                                </aside>
                            </section>
                        </aside>
                    </aside>
                    <aside id="post-page-bar-main-container">
                        booba bar
                    </aside>
                </div>
                <div id="post-page-comments-main-container">
                    {/* TO DO: Implement a comments section component that will return a default "no messages yet" section or the comments, o boy, that's gunna be hard */}
                </div>

            </div>
        )
    }


    return currentPost.length > 0 && currentSubreddit.length > 0 && load ? (
        <div id="post-page-background">
            {LoadOnePost()}
        </div>
    ) : (
        <div></div>
    )


}

export default OnePost
