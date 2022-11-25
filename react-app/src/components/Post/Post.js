import "./Post.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/post"

const Post = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postActions.loadPostsThunk())
        // dispatch(postActions.loadPostThunk(1))
    }, [dispatch])

    return (
        <div id="post-main-container">
            <aside id="post-left-container">
                <section id="post-upvote-container">
                    <button id="post-upvote-button">
                        <i className="fa-solid fa-up-long" />
                    </button>
                    <section id="post-vote-counter">420</section>
                    <button id="post-downvote-button">
                        <i className="fa-solid fa-down-long" />
                    </button>
                </section>
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
                        Post Title
                    </section>
                    <section id="post-body">
                        Post Body
                    </section>
                </section>
                <section id="post-footer-container">
                    <aside>
                        Comments
                    </aside>
                </section>
            </aside>

        </div>

    )
}

export default Post;
