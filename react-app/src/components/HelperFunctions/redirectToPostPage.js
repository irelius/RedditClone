const redirectToPostPage = (subredditName, postId, history, e) => {
    e.preventDefault()
    e.stopPropagation();
    return (
        history.push(`/r/${subredditName}/${postId}`)
    )
}

export default redirectToPostPage
