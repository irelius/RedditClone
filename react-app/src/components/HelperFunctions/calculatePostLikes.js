const calculatePostLikes = (post) => {
    let likes = 0;
    let dislikes = 0;

    let likesArray = [];

    if (post && post.likes) {
        likesArray = Object.values(post.likes)
    }

    if (likesArray.length > 0) {
        likesArray.forEach(el => {
            if (el.like_status === "like") {
                likes++
            }
            else if (el.like_status === "dislike") {
                dislikes++
            }
        })
        return likes - dislikes
    }

    return likes
}

export default calculatePostLikes;
