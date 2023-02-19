import "./SearchPage.css"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"

import * as sessionActions from "../../store/session"
import * as subredditActions from "../../store/subreddit"
import * as postActions from "../../store/post"
import * as commentActions from "../../store/comment"

import SearchCommentsComponent from "./SearchPageComponents/SearchCommentsComponent"
import SearchPostsComponent from "./SearchPageComponents/SearchPostsComponent"
import SearchCommunitiesComponent from "./SearchPageComponents/SearchCommunitiesComponent"
import SearchPeopleComponent from "./SearchPageComponents/SearchPeopleComponent"

const SearchPage = () => {
    const searchTerm = useParams().search_param
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)
    const [searchState, setSearchState] = useState('posts')

    useEffect(() => {
        dispatch(sessionActions.loadAllUserThunk())
        dispatch(subredditActions.loadSubredditsThunk())
        dispatch(postActions.loadPostsThunk())
        dispatch(commentActions.loadCommentsThunk())

        setLoad(true)
    }, [dispatch])

    const allPosts = Object.values(useSelector(postActions.loadAllPosts))
    const allSubreddits = Object.values(useSelector(subredditActions.loadAllSubreddit))
    const allUsers = Object.values(useSelector(sessionActions.loadAllUsers))
    const allComments = Object.values(useSelector(commentActions.loadAllComments))

    const props = {
        "searchParam": searchTerm,
        "allPosts": allPosts,
        "allSubreddits": allSubreddits,
        "allUsers": allUsers,
        "allComments": allComments
    }

    // console.log('booba 1', props)

    const loadSearchState = () => {
        if (searchState === "posts") {
            return <SearchPostsComponent props={props} />
        }
        if (searchState === "comments") {
            return <SearchCommentsComponent props={props} />
        }
        if (searchState === "communities") {
            return <SearchCommunitiesComponent props={props} />
        }
        if (searchState === "people") {
            return <SearchPeopleComponent props={props} />
        }
    }

    return allPosts.length > 0 && allSubreddits.length > 0 && allUsers.length > 0 && allComments.length > 0 && load ? (
        <div id="search-page-main-container">
            <section id="search-page-tabs-container">
                <aside id={`search-page-posts-selected-${searchState}`} onClick={() => setSearchState("posts")}>
                    Posts
                </aside>
                <aside id={`search-page-comments-selected-${searchState}`} onClick={() => setSearchState("comments")}>
                    Comments
                </aside>
                <aside id={`search-page-communities-selected-${searchState}`} onClick={() => setSearchState("communities")}>
                    Communities
                </aside>
                <aside id={`search-page-people-selected-${searchState}`} onClick={() => setSearchState("people")}>
                    People
                </aside>
            </section>
            <section id="search-page-body-container">
                {loadSearchState()}
            </section>
        </div>
    ) : (
        <div></div>
    )
}

export default SearchPage
