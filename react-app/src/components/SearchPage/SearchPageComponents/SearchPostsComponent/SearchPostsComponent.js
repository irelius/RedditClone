import "./SearchPostsComponent.css"

const SearchPostsComponent = ({props}) => {
    console.log('booba', props)

    const searchTermLower = props["searchParam"].toLowerCase()

    let searchPostsArray = Object.values(props["allPosts"][0]).filter(el => {
        if(el["body"].toLowerCase().includes(props["searchParam"].toLowerCase()) || el["title"].toLowerCase().includes(props["searchParam"].toLowerCase())) {
            return el
        }
    })

    let searchCommunitiesArray = Object.values(props["allSubreddits"][0]).filter(el => {
        if(el["name"].toLowerCase().includes(searchTermLower) || el["description"].toLowerCase().includes(searchTermLower)) {
            return el
        }
    })

    let searchPeoplesArray = Object.values(props["allUsers"][1]).filter(el => {
        if(el["username"].toLowerCase().includes(searchTermLower)) return el
    })

    console.log("booba", '\n', searchPostsArray, '\n', searchCommunitiesArray, '\n', searchPeoplesArray)

    return (
        <div id="search-posts-component-main-container">
            <aside id="search-posts-component-left-section">
                left section
            </aside>
            <aside id="search-posts-component-right-section">
                rigth section
            </aside>
        </div>
    )
}

export default SearchPostsComponent
