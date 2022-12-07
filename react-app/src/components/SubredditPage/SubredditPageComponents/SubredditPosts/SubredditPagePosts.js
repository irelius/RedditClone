import "./SubredditPagePosts.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import * as postActions from "../../../../store/post"

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

const SubredditPagePosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [load, setLoad] = useState(false)

    useEffect(() => {
        const currentSubredditName = window.location.href.split("/")[4]
        dispatch(postActions.loadCurrentSubredditPostsThunk(currentSubredditName))
        setLoad(true)
        return () => dispatch(postActions.clearPost())
    }, [dispatch])


    const currentSubredditPosts = Object.values(useSelector(postActions.loadAllPosts));

    const redirectToPostPage = (post) => {
        const postId = post.id
        const subredditName = window.location.href.split("/")[4]

        history.push(`/r/${subredditName}/${postId}`)
    }


    const LoadSubredditPagePosts = () => {
        const subredditPostsToLoad = Object.values(currentSubredditPosts[0])

        return (
            Array.isArray(subredditPostsToLoad) && subredditPostsToLoad.map(el => {
                return (
                    <div onClick={() => redirectToPostPage(el)} id="subreddit-post-main-container">
                        <aside id="subreddit-post-left-container">
                            <aside id="subreddit-post-upvote-button">
                                <i className="fa-solid fa-up-long fa-lg" />
                            </aside>
                            <aside id="subreddit-post-vote-counter">{calculatePostLikes(el)}</aside>
                            <aside id="subreddit-post-downvote-button">
                                <i className="fa-solid fa-down-long fa-lg" />
                            </aside>
                        </aside>
                        <aside id="subreddit-post-right-container">
                            <section id="subreddit-post-header-container">
                                <aside id="subreddit-post-header-subreddit-post-information">
                                    Post Header
                                </aside>
                                {/* <aside id="subreddit-post-header-join-container">
                            </aside> */}
                            </section>
                            <section id="subreddit-post-body-container">
                                <section id="subreddit-post-title">
                                    {el.title}
                                </section>
                                <section id="subreddit-post-body">
                                    {el.body}
                                </section>
                            </section>
                            <section id="subreddit-post-footer-container">
                                <aside id="subreddit-post-footer-comments">
                                    <aside>
                                        <i id="subreddit-post-footer-comments-icon" className="fa-regular fa-message fa-lg" />
                                    </aside>
                                    <aside>
                                        Comments
                                    </aside>
                                </aside>
                            </section>
                        </aside>
                    </div>
                )
            })
        )
    }

    return currentSubredditPosts.length > 0 && load ? (
        <div>
            {LoadSubredditPagePosts()}
        </div>
    ) : (
        <div></div>
    )
}

export default SubredditPagePosts;
