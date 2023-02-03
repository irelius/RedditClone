// ------------------------------- ACTIONS ------------------------------- //
const LOAD_COMMENT = "/comments/LOAD_COMMENT"
const LOAD_COMMENTS = "/comments/LOAD_COMMENTS"
const CREATE_COMMENT = "/comments/CREATE_COMMENT"
const PUT_COMMENT = "/comments/PUT_COMMENT"
const DELETE_COMMENT = "/comments/DELETE_COMMENT"
const CLEAR_COMMENT = "/comments/CLEAR_COMMENT"

// Get one comment
export const loadComment = (comment) => {
    return {
        type: LOAD_COMMENT,
        comment
    }
}

// Get all comments
export const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

// Create a new comment
export const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

// Update a comment
export const updateComment = (comment) => {
    return {
        type: PUT_COMMENT,
        comment
    }
}

// Delete a comment
export const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export const clearComment = () => {
    return {
        type: CLEAR_COMMENT
    }
}


// ------------------------------- THUNKS ------------------------------- //

// Thunk action to load all comments
export const loadCommentsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/comments`)

    if (res.ok) {
        const comments = await res.json();
        dispatch(loadComments(comments))
        return comments
    }
}

// Thunk action to load one comment
export const loadCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`)

    if (res.ok) {
        const comment = await res.json();
        dispatch(loadComments(comment))
        return comment
    }
}

// Thunk action to load all comments by user
export const loadUserCommentsThunk = (username) => async (dispatch) => {
    const res = await fetch(`/api/posts/users/${username}`)

    if (res.ok) {
        const comments = await res.json()
        dispatch(loadComments(comments))
        return comments
    }
}

// Thunk action to load all comments for a specific post
export const loadPostCommentsThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/comments/posts/${postId}`)

    if (res.ok) {
        const comments = await res.json()
        dispatch(loadComments(comments))
        return comments
    } else {
        return "test"
    }
}

// Thunk action to create a new comment
export const createCommentThunk = (commentInfo, postId) => async (dispatch) => {
    const res = await fetch(`/api/comments/posts/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentInfo)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createComment(data))

    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }

    return null
}


// Thunk action to update a comment
export const putCommentThunk = (commentInfo, comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentInfo)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(updateComment(data))
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }

    return null
}


// Thunk action to delete a comment
export const deleteCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteComment(comment.id))
    }

    return null
}


// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadAllComments = (state) => state.comments;



// ------------------------------ REDUCERS ------------------------------ //

const initialState = {};

const commentReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case LOAD_COMMENTS:
            const allComments = { "comments": {} }

            if(action.comments.comments === "No comments") {
            } else {
                const commentsArray = Object.values(action.comments.comments)
                commentsArray.forEach(el => {
                    allComments["comments"][el.id] = el
                })
                return allComments
            }
            /* falls through */

        case CREATE_COMMENT:
            return newState

        case DELETE_COMMENT:
            const deletedComment = { ...newState }
            delete deletedComment[action.commentId]
            return deletedComment

        case CLEAR_COMMENT:
            return initialState;

        default:
            return newState
    }

}

export default commentReducer
