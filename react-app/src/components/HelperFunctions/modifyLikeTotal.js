const modifyLikeTotal = (post, initialPostLikes, modifiedPostLikes) => {
    if (initialPostLikes[post["id"]] === "like" && modifiedPostLikes[post["id"]] === "neutral") {
        return -1
    }
    if (initialPostLikes[post["id"]] === "like" && modifiedPostLikes[post["id"]] === "dislike") {
        return -2
    }

    if (initialPostLikes[post["id"]] === "dislike" && modifiedPostLikes[post["id"]] === "neutral") {
        return 1
    }
    if (initialPostLikes[post["id"]] === "dislike" && modifiedPostLikes[post["id"]] === "like") {
        return 2
    }

    if (modifiedPostLikes[post["id"]] === "like") {
        return 1
    }
    if (modifiedPostLikes[post["id"]] === "dislike") {
        return -1
    }

    return 0
}

export default modifyLikeTotal;
