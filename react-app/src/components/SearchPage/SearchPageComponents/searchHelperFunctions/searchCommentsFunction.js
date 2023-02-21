import searchPeoplesFunction from "./searchPeoplesFunction"

const searchCommentsFunction = (props) => {
    let searchCommentsArray = [];

    Object.values(props["allComments"][0]).forEach(comment => {
        if (comment["body"].toLowerCase().includes(props["searchParam"].toLowerCase())) {
            searchCommentsArray.push(comment)
        }
    })

    return searchCommentsArray
}

export default searchCommentsFunction
