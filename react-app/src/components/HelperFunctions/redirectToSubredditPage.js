import { useHistory } from "react-router-dom";

const redirectToSubredditPage = (name, history, e) => {
    e.stopPropagation()
    return (
        history.push(`/r/${name}`)
    )

}

export default redirectToSubredditPage
