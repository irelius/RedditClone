// ------------------------------- ACTIONS ------------------------------- //
const LOAD_LIKES = '/likes/LOAD_LIKES'
const CREATE_LIKES = '/likes/CREATE_LIKES'
const PUT_LIKES = '/likes/PUT_LIKES'
const DELETE_LIKES = '/likes/DELETE_LIKES'
const CLEAR_LIKES = "/likes/CLEAR_LIKES"

// Get likes for a post
export const loadLikesPost = (likes) => {
    return {
        type: LOAD_LIKES,
        likes
    }
}

// Get likes for a comment
export const loadLikesComment = (likes) => {
    return {
        type: LOAD_LIKES,
        likes
    }
}

// create likes/dislikes for a post
export const createLikePost = (likes) => {
    return {
        type: CREATE_LIKES,
        likes
    }
}

// create likes for comment
export const createLikeComment = (commentId) => {
    return {
        type: CREATE_LIKES,
        commentId
    }
}

// // edit like for a post
// export const putLikesPost = (postId) => {
//     return {
//         type: PUT_LIKES,
//         postId
//     }
// }

// // edit like for a comment
// export const putLikesComment = (commentId) => {
//     return {
//         type: PUT_LIKES,
//         commentId
//     }
// }

// delete like for a post
export const deleteLikePost = (postId) => {
    return {
        type: DELETE_LIKES,
        postId
    }
}

export const clearLikes = () => {
    return {
        type: CLEAR_LIKES,
    }
}


// ------------------------------- THUNKS ------------------------------- //

// Thunk action to load likes for a post
export const loadLikesPostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/likes/posts/${postId}`)


    if (res.ok) {
        const likes = await res.json()
        dispatch(loadLikesPost(likes))
        return likes
    }
}


// Thunk action to load likes for a comment
export const loadLikesCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/likes/comments/${commentId}`)

    if (res.ok) {
        const likes = await res.json()
        dispatch(loadLikesComment(likes))
        return likes
    }
}


export const createLikePostThunk = (likeInfo, postId) => async (dispatch) => {
    const res = await fetch(`/api/likes/posts/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(likeInfo),
    })

    if (res.ok) {
        const like = await res.json()
        dispatch(createLikePost(like))
        return like
    }

    return null
}

export const createDislikePostThunk = (dislikeInfo, postId) => async (dispatch) => {
    const res = await fetch(`/api/likes/posts/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dislikeInfo),
    })

    if (res.ok) {
        const dislike = await res.json()
        dispatch(createLikePost(dislike))
        return dislike
    }

    return null
}


export const createLikeCommentThunk = (likeInfo, commentId) => async (dispatch) => {
    // TO DO
}


// export const updateLikePostThunk = (likeInfo, postId) => async (dispatch) => {
//     const res = await fetch(`/api/likes/posts/${postId}`, {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(likeInfo)
//     })

//     if (res.ok) {
//         const like = await res.json()
//         dispatch(putLikesPost(like))
//         return like
//     } else if (res.status < 500) {
//         const data = res.json()
//         if (data.errors) {
//             return data.errors
//         }
//     }

//     return null
// }

export const deleteLikePostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/likes/posts/${postId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const data = dispatch(deleteLikePost(postId))
        return true;
    }

    return null;
}


// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadPostLikes = (state) => state.likes;


// ------------------------------ REDUCERS ------------------------------ //

const initialState = {};

const likesReducer = (state = initialState, action) => {
    const newState = { ...state }

    switch (action.type) {
        case LOAD_LIKES:
            return Object.assign({}, newState, action.likes);

        case CREATE_LIKES:
            return Object.assign({}, newState, action.likes);

        case DELETE_LIKES:
            return Object.assign({}, newState, action.postId);

        case CLEAR_LIKES:
            return initialState

        default:
            return newState
    }
}


export default likesReducer
