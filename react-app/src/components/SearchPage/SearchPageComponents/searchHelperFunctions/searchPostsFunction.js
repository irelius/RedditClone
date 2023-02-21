import searchPeoplesFunction from "./searchPeoplesFunction"

const searchPostsFunction = (props) => {
    let searchPeoplesArray = searchPeoplesFunction(props)

    let searchPostsArray = []

    Object.values(props["allPosts"][0]).forEach(post => {
        if (searchPeoplesArray.length > 0) {
            searchPeoplesArray.forEach(person => {
                if (person["id"] === post['user_id']) searchPostsArray.push(post)
            })
        } else {
            if (post["body"].toLowerCase().includes(props["searchParam"].toLowerCase()) || post["title"].toLowerCase().includes(props["searchParam"].toLowerCase())) {
                searchPostsArray.push(post)
            }
        }
    })

    return searchPostsArray;
}

export default searchPostsFunction
