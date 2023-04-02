import "./SearchPostsComponent.css"
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import SubredditCreateModal from "../../../Modals/SubredditCreateModal"

import calculatePostLikes from "../../../HelperFunctions/calculatePostLikes"
import redirectToSubredditPage from "../../../HelperFunctions/redirectToSubredditPage";
import redirectToUserPage from "../../../HelperFunctions/redirectToUserPage";
import redirectToPostPage from "../../../HelperFunctions/redirectToPostPage";

import searchPostsFunction from "../searchHelperFunctions/searchPostsFunction";
import searchPeoplesFunction from "../searchHelperFunctions/searchPeoplesFunction";
import searchCommunitiesFunction from "../searchHelperFunctions/searchCommunitiesFunction";


const SearchPostsComponent = ({ props }) => {
    const history = useHistory()

    const [showProfileMenu, setShowProfileMenu] = useState(false)

    let searchPeoplesArray = searchPeoplesFunction(props)
    let searchPostsArray = searchPostsFunction(props)
    let searchCommunitiesArray = searchCommunitiesFunction(props)

    const searchPostsLeftSection = () => {
        if (searchPostsArray.length > 0) {
            return (
                Array.isArray(searchPostsArray) && searchPostsArray.map((el, i) => {
                    const posterId = el["user_id"]
                    const poster = Object.values(props["allUsers"])[1][posterId]
                    const subredditId = el["subreddit_id"]
                    const subreddit = Object.values(props["allSubreddits"])[0][subredditId]

                    const commentsBelongingToPosts = Object.values(props["allComments"][0]).filter(comment => {
                        if (comment["post_id"] === el["id"]) {
                            return el
                        }
                    })

                    let imageToLoad
                    if (el["images"][1]) {
                        imageToLoad = el["images"][1]["image_url"]
                    } else {
                        imageToLoad = null
                    }

                    return (
                        <div key={i} id="search-posts-left-section-main-container" onClick={(e) => redirectToPostPage(subreddit['name'], el['id'], history, e)}>
                            <aside id="search-posts-left-section-left-container">
                                <section>
                                    <section id='search-posts-left-section-header-container'>
                                        {/* TO DO, add ability to create a subreddit icon */}
                                        {/* <aside><img src=} /></aside> */}
                                        <aside onClick={(e) => redirectToSubredditPage(subreddit["name"], history, e)} id="search-posts-left-section-subreddit-name">r/{subreddit["name"]}</aside>
                                        <aside id="search-posts-left-section-posted-by">Posted by</aside>
                                        <aside onClick={(e) => redirectToUserPage(poster["username"], history, e)} id="search-posts-left-section-poster-name">u/{poster["username"]}</aside>
                                    </section>
                                    <section id="search-posts-left-section-body-container">
                                        {el["title"]}
                                    </section>
                                </section>
                                <section id="search-posts-left-section-footer-container">
                                    <aside id="search-posts-left-section-likes-value">{calculatePostLikes(el)} upvotes</aside>
                                    <aside>{commentsBelongingToPosts.length} comments</aside>
                                </section>
                            </aside>
                            <aside id="search-posts-left-section-right-container">
                                {imageToLoad ? (
                                    <img src={imageToLoad}
                                        width={130}
                                        height={100}
                                        alt={`readdit-search-preview-${imageToLoad}`}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </aside>
                        </div>
                    )
                })
            )
        } else {
            return (
                <div id="search-posts-left-section-no-results-container">
                    <section id="search-posts-left-section-no-posts-header">
                        Hm... we couldn’t find any results for "{props["searchParam"]}"
                    </section>
                    <section id="search-posts-left-section-no-posts-subtitle">
                        Double-check your spelling or try different keywords to adjust your search
                    </section>
                </div>
            )
        }
    }

    const searchPostsCommunitiesSection = () => {
        if (searchCommunitiesArray.length > 0) {
            return (
                Array.isArray(searchCommunitiesArray) && searchCommunitiesArray.map((el, i) => {
                    return (
                        <div key={i} id='search-posts-communities' onClick={(e) => redirectToSubredditPage(el["name"], history, e)}>
                            r/{el["name"]}
                        </div>
                    )
                })
            )
        } else {
            return (
                <div>
                    <section id="search-posts-no-communities-header">
                        There doesn't seem to be a community with that name. Why not create one?
                    </section>
                    <section id="search-posts-create-community-button">
                        <SubredditCreateModal setShowProfileMenu={setShowProfileMenu} />
                    </section>
                </div>
            )
        }
    }

    const searchPostsPeopleSection = () => {
        if (searchPeoplesArray.length > 0) {
            return (
                Array.isArray(searchPeoplesArray) && searchPeoplesArray.map((el, i) => {
                    return (
                        <div key={i} id='search-posts-people-container' onClick={(e) => redirectToUserPage(el["username"], history, e)}>
                            <aside>
                                <img id="search-posts-people-profile-image" src={el["profile_image"]}
                                    width={30}
                                    height={30}
                                    alt={`readdit-profile: ${el["profile_image"]}`}
                                />
                            </aside>
                            <aside id="search-posts-people-username">
                                u/{el["username"]}
                            </aside>
                        </div>
                    )
                })
            )
        } else {
            return (
                <div>
                    No results
                </div>
            )
        }
    }

    return (
        <div id="search-posts-component-main-container">
            <aside id="search-posts-component-left-section">
                {searchPostsLeftSection()}
            </aside>
            <aside id="search-posts-component-right-section">
                <section id="search-posts-right-section-communities-container">
                    <section id="search-posts-right-section-header-container">
                        Communities
                    </section>
                    <section id="search-posts-right-section-body-container">
                        {searchPostsCommunitiesSection()}
                    </section>
                </section>
                <section id="search-posts-right-section-peoples-container">
                    <section id="search-posts-right-section-header-container">
                        People
                    </section>
                    <section>
                        {searchPostsPeopleSection()}
                    </section>
                </section>
            </aside>
        </div>
    )
}

export default SearchPostsComponent
