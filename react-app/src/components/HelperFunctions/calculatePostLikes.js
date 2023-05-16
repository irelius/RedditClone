const calculatePostLikes = (post) => {
    let likes = 0;
    let dislikes = 0;

    let likesArray = [];

    if (post && post.post_likes) {
        likesArray = Object.values(post.post_likes)
    }
    console.log('booba', likesArray)

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

// test
