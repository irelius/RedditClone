import "./SearchPostsComponent.css"

import calculatePostLikes from "../../../HelperFunctions/calculatePostLikes"

const SearchPostsComponent = ({ props }) => {
    console.log('booba props', props)

    const searchTermLower = props["searchParam"].toLowerCase()

    let searchPostsArray = Object.values(props["allPosts"][0]).filter(el => {
        if (el["body"].toLowerCase().includes(props["searchParam"].toLowerCase()) || el["title"].toLowerCase().includes(props["searchParam"].toLowerCase())) {
            return el
        }
    })

    let searchCommunitiesArray = Object.values(props["allSubreddits"][0]).filter(el => {
        if (el["name"].toLowerCase().includes(searchTermLower) || el["description"].toLowerCase().includes(searchTermLower)) {
            return el
        }
    })

    let searchPeoplesArray = Object.values(props["allUsers"][1]).filter(el => {
        if (el["username"].toLowerCase().includes(searchTermLower)) return el
    })

    console.log("booba", '\n', searchPostsArray, '\n', searchCommunitiesArray, '\n', searchPeoplesArray)

    const searchPostsLeftSection = () => {
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
                    <div key={i} id="search-posts-left-section-main-container">
                        <aside id="search-posts-left-section-left-container">
                            <section>
                                <section id='search-posts-left-section-header-container'>
                                    {/* TO DO, add ability to create a subreddit icon */}
                                    {/* <aside><img src=} /></aside> */}
                                    <aside id="search-posts-left-section-subreddit-name">r/{subreddit["name"]}</aside>
                                    <aside id="search-posts-left-section-posted-by">Posted by</aside>
                                    <aside id="search-posts-left-section-poster-name">u/{poster["username"]}</aside>
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
                                />
                            ) : (
                                <div></div>
                            )}
                        </aside>
                    </div>
                )
            })
        )
    }

    const searchPostsRightSection = () => {
        return (
            <div>
                <section>

                </section>
            </div>
        )
    }

    return (
        <div id="search-posts-component-main-container">
            <aside id="search-posts-component-left-section">
                {searchPostsLeftSection()}
            </aside>
            <aside id="search-posts-component-right-section">
                <section id="search-posts-right-section-header-container">
                    Communities
                </section>
                <section id="search-posts-right-section-body-container">
                    {searchPostsRightSection()}
                </section>
            </aside>
        </div>
    )
}

export default SearchPostsComponent
