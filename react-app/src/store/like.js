// ------------------------------- ACTIONS ------------------------------- //
const LOAD_LIKES = '/likes/LOAD_LIKES'
const CREATE_LIKES = '/likes/CREATE_LIKES'
const PUT_LIKES = '/likes/PUT_LIKES'

// Get likes for a post
export const loadLikesPost = (post) => {
    return {
        type: LOAD_LIKES,
        post
    }
}

// Get likes for a comment
export const loadLikesComment = (commentId) => {
    return {
        type: LOAD_LIKES,
        commentId
    }
}

// create likes for a post
export const createLikePost = (postId) => {
    return {
        type: CREATE_LIKES,
        postId
    }
}

// create likes for comment
export const createLikeComment = (commentId) => {
    return {
        type: CREATE_LIKES,
        commentId
    }
}

// edit like for a post
export const putLikesPost = (postId) => {
    return {
        type: PUT_LIKES,
        postId
    }
}

// edit like for a comment
export const putLikesComment = (commentId) => {
    return {
        type: PUT_LIKES,
        commentId
    }
}


// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadLikes = (state) => state.likes;


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
    const res = await fetch(`/api/likes/posts/${commentId}`)

    if (res.ok) {
        const likes = await res.json()
        dispatch(loadLikesComment(likes))
        return likes
    }
}



// ------------------------------ REDUCERS ------------------------------ //

const initialState = {};

const likesReducer = (state = initialState, action) => {
    const newState = { ...state }

    switch(action.type) {
        case LOAD_LIKES:
            return Object.assign({}, newState, action.likes);

        // case CREATE_LIKES:

        // case PUT_LIKES:


        default:
            return newState
    }
}


export default likesReducer
