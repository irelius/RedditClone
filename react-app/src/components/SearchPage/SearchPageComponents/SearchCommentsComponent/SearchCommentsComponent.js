import "./SearchCommentsComponent.css"

import searchCommentsFunction from "../searchHelperFunctions/searchCommentsFunction";
import calculatePostLikes from "../../../HelperFunctions/calculatePostLikes";
import redirectToPostPage from "../../../HelperFunctions/redirectToPostPage";
import redirectToSubredditPage from "../../../HelperFunctions/redirectToSubredditPage";
import redirectToUserPage from "../../../HelperFunctions/redirectToUserPage";
import { useHistory } from "react-router-dom";

const SearchCommentsComponent = ({ props }) => {
    const history = useHistory()

    let searchCommentsArray = searchCommentsFunction(props)

    if(searchCommentsArray.length > 0) {
        return (
            Array.isArray(searchCommentsArray) && searchCommentsArray.map((el, i) => {
                const commenterId = el["user_id"]
                const commenter = Object.values(props["allUsers"])[1][commenterId]
                const postId = el["post_id"]
                const post = Object.values(props["allPosts"])[0][postId]
                const posterId = post["user_id"]
                const poster = Object.values(props["allUsers"])[1][posterId]
                const subredditId = el["subreddit_id"]
                const subreddit = Object.values(props["allSubreddits"])[0][subredditId]

                const commentsBelongingToPosts = Object.values(props["allComments"][0]).filter(comment => {
                    if (comment["post_id"] === el["id"]) {
                        return el
                    }
                })

                return (
                    <div key={i} id="search-comments-main-container" onClick={(e) => redirectToPostPage(subreddit["name"], postId, history, e)}>
                        <section>
                            <section id="search-comments-posts-header-section">
                                <aside id="search-comments-posts-subreddit-section" onClick={(e) => redirectToSubredditPage(subreddit["name"], history, e)}>r/{subreddit["name"]}</aside>
                                <aside id="search-comments-posts-poster-section" onClick={(e) => redirectToUserPage(poster["username"], history, e)}>
                                    Posted by <section id="search-comments-posts-poster-name">u/{poster["username"]}</section>
                                </aside>
                            </section>
                            <section id="search-comments-posts-title">{post["title"]}</section>
                            <section id="search-comments-comment-main-container">
                                <section id="search-comments-comment-top-section">
                                    <section id="search-comments-comment-header-section">
                                        <img id="search-comments-commenter-profile-image" src={commenter['profile_image']}
                                            height={25}
                                            width={25}
                                        />
                                        <aside id="search-comments-commenter-name" onClick={(e) => redirectToUserPage(commenter["username"], history, e)}>{commenter["username"]}</aside>
                                    </section>
                                    <section id="search-comments-comment-body">{el["body"]}</section>
                                </section>
                                <section id="search-comments-comment-bottom-section">{calculatePostLikes(el)} upvotes</section>
                            </section>
                        </section>
                        <section id="search-comments-posts-footer">
                            <aside id="search-comments-post-upvote-count">{calculatePostLikes(post)} upvotes</aside>
                            <aside id="search-comments-post-comments-count">{commentsBelongingToPosts.length} comments</aside>
                        </section>
                    </div>

                )
            })
        )
    } else {
        return (
            <div id="search-comments-no-results-main-container">
                <section id="search-comments-no-results-header">
                    Hm... we couldn’t find any results for "{props["searchParam"]}"
                </section>
                <section id="search-comments-no-results-subtitle">
                    Double-check your spelling or try different keywords to adjust your search
                </section>
            </div>
        )
    }
}

export default SearchCommentsComponent
