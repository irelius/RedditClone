// ------------------------------- ACTIONS ------------------------------- //
const LOAD_POST = '/posts/LOAD_POST'
const LOAD_POSTS = '/posts/LOAD_POSTS'
const CREATE_POST = '/posts/CREATE_POST'
const DELETE_POST = '/posts/DELETE_POST'

// Get one post
export const loadPost = (postId) => {
    return {
        type: LOAD_POST,
        postId
    }
}

// Get all posts
export const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}

// Create a new post
export const createPost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}

// Delete a post
export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}


// ------------------------------- THUNKS ------------------------------- //

// Thunk action to load a specific post
export const loadPostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`)
    const test = await fetch(`/api/likes/posts/${postId}`)

    const test2 = await test.json()
    console.log("test thunk", test2)

    if (res.ok) {
        const post = await res.json();
        console.log("post", post)
        dispatch(loadPost(post))
        return post
    }
}

// Thunk action to load all posts
export const loadPostsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/posts`)

    if (res.ok) {
        const posts = await res.json();
        dispatch(loadPosts(posts))
        return posts
    }
}


// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadAllPosts = (state) => state.post;




// ------------------------------ REDUCERS ------------------------------ //

const initialState = {};

const postReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch(action.type) {
        case LOAD_POST:
            // const test = action.posts

            return Object.assign({}, newState, action.posts);
            // return test;
        case LOAD_POSTS:
            return Object.assign({}, newState, action.posts);
        // case CREATE_POST:

        // case DELETE_POST:

        default:
            return newState
    }

}

export default postReducer
