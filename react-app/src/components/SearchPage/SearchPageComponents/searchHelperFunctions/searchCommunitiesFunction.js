const searchCommunitiesFunction = (props) => {
    const searchTermLower = props["searchParam"].toLowerCase()

    let searchCommunitiesArray = Object.values(props["allSubreddits"][0]).filter(el => {
        if (el["name"].toLowerCase().includes(searchTermLower) || el["description"].toLowerCase().includes(searchTermLower)) {
            return el
        }
    })

    return searchCommunitiesArray
}

export default searchCommunitiesFunction
