const redirectToPostPage = (subredditName, postId, history, e) => {
    e.stopPropagation();
    return (
        history.push(`/r/${subredditName}/${postId}`)
    )
}

export default redirectToPostPage
