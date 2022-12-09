import "./AllPosts.css"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import * as postActions from "../../../store/post"
import * as subredditActions from "../../../store/subreddit"
import * as sessionActions from "../../../store/session"

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
        dispatch(sessionActions.loadAllUserThunk())
        setLoad(true)
        dispatch(subredditActions.clearSubreddit())
        return () => dispatch(postActions.clearPost())
    }, [dispatch])

    const allPosts = Object.values(useSelector(postActions.loadAllPosts))
    const allSubreddits = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(sessionActions.loadAllUsers))

    const redirectToPostPage = (post) => {

        const postId = post.id
        const subredditName = allSubreddits[0][post.subreddit_id]["name"]

        history.push(`/r/${subredditName}/${postId}`)
    }

    const redirectToUserPage = (username, e) => {
        e.stopPropagation();

        history.push(`/users/${username}`)
    }

    const redirectToSubredditPage = (name, e) => {
        e.stopPropagation();

        history.push(`/r/${name}`)
    }

    const loadAllPosts = () => {
        const postsToLoad = Object.values(allPosts[0])
        const usersToLoad = allUsers[1]
        const subredditsToLoad = allSubreddits[0]

        return (
            Array.isArray(postsToLoad) && postsToLoad.map((el, i) => {
                const posterId = el["user_id"]
                const posterInfo = usersToLoad[posterId]

                const subredditId = el["subreddit_id"]
                const subredditInfo = subredditsToLoad[subredditId]

                return (
                    <div onClick={() => redirectToPostPage(el)} id="post-main-container" key={i}>
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
                                <aside>
                                    {subredditInfo ? (
                                        <section id="post-header-subreddit-information" onClick={(e) => redirectToSubredditPage(subredditInfo.name, e)}>
                                            r/{subredditInfo.name}
                                        </section>
                                    ) : (
                                        <section id="post-header-no-subreddit">
                                            Subreddit no longer exists.
                                        </section>
                                    )}
                                </aside>
                                <aside id="post-header-post-information">
                                    Posted by
                                    <section id="post-header-poster" onClick={(e) => redirectToUserPage(posterInfo.username, e)}>
                                        u/{posterInfo.username}
                                    </section>
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

    return allPosts.length > 0 && allUsers.length > 1 && allSubreddits.length > 0 && load ? (
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
