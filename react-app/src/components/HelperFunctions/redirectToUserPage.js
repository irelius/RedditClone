const redirectToUserPage = (username, history, e) => {
    e.stopPropagation();
    return (
        history.push(`/users/${username}`)
    )
}

export default redirectToUserPage
