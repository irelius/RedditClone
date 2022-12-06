import "./AllPosts.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import * as postActions from "../../../store/post"
import * as subredditActions from "../../../store/subreddit"

// helper function
const calculatePostLikes = (post) => {
    let likes = 0;
    let dislikes = 0;

    let likesArray = [];

    if (post && post.likes) {
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

const AllPosts = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [load, setLoad] = useState(false)


    useEffect(() => {
        dispatch(postActions.loadPostsThunk())
        dispatch(subredditActions.loadSubredditsThunk())
        setLoad(true)
        return () => dispatch(postActions.clearPost())
    }, [])

    const allPosts = Object.values(useSelector(postActions.loadAllPosts))
    const allSubreddits = Object.values(useSelector(subredditActions.loadAllSubreddit))


    const redirectToPostPage = (post) => {
        const postId = post.id
        const subredditName = allSubreddits[0][post.subreddit_id]["name"]

        history.push(`/r/${subredditName}/${postId}`)
    }


    const loadAllPosts = () => {
        const postsToLoad = Object.values(allPosts[0])

        return (
            Array.isArray(postsToLoad) && postsToLoad.map(el => {

                return (
                    <div onClick={() => redirectToPostPage(el)} id="post-main-container">
                        <aside id="post-left-container">
                            <aside id="post-upvote-button">
                                <i className="fa-solid fa-up-long fa-lg" />
                            </aside>
                            <aside id="post-vote-counter">{calculatePostLikes(el)}</aside>
                            <aside id="post-downvote-button">
                                <i className="fa-solid fa-down-long fa-lg" />
                            </aside>
                        </aside>
                        <aside id="post-right-container">
                            <section id="post-header-container">
                                <aside id="post-header-post-information">
                                    Post Header
                                </aside>
                                {/* <aside id="post-header-join-container">
                                </aside> */}
                            </section>
                            <section id="post-body-container">
                                <section id="post-title">
                                    {el.title}
                                </section>
                                <section id="post-body">
                                    {el.body}
                                </section>
                            </section>
                            <section id="post-footer-container">
                                <aside id="post-footer-comments-container">
                                    <aside>
                                        <i id="post-footer-comments-icon" className="fa-regular fa-message fa-lg" />
                                    </aside>
                                    <aside id="post-footer-comments">
                                        Comments
                                    </aside>
                                </aside>
                                <aside id="post-footer-dots-container">
                                    <i id="post-footer-dots-icon" className="fa-solid fa-ellipsis" />
                                </aside>
                            </section>
                        </aside>
                    </div>
                )
            })
        )
    }

    return allPosts.length > 0 && load ? (
        <div>
            {loadAllPosts()}
        </div>
    ) : (
        <div>
            Please wait
        </div>
    )

}

export default AllPosts;
