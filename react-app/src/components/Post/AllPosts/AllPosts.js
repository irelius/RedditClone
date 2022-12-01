import "./AllPosts.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const AllPosts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postActions.loadPostsThunk())
        return () => dispatch(postActions.clearPost())
    }, [dispatch])

    const allPosts = Object.values(useSelector(postActions.loadAllPosts))


    const loadAllPosts = () => {
        const postsToLoad = Object.values(allPosts[0])

        return (
            Array.isArray(postsToLoad) && postsToLoad.map(el => {

                return (
                    <div id="post-main-container">
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
                                <aside id="post-footer-comments">
                                    <aside>
                                        <i id="post-footer-comments-icon" className="fa-regular fa-message fa-lg" />
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

    return allPosts.length > 0 ? (
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
