// ------------------------------- ACTIONS ------------------------------- //
const LOAD_POST = '/posts/LOAD_POST'
const LOAD_POSTS = '/posts/LOAD_POSTS'
const CREATE_POST = '/posts/CREATE_POST'
const DELETE_POST = '/posts/DELETE_POST'
const CLEAR_POST = "/posts/CLEAR_POST"

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

export const clearPost = () => {
    return {
        type: CLEAR_POST,
    }
}


// ------------------------------- THUNKS ------------------------------- //

// Thunk action to load a specific post
export const loadPostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`)

    if (res.ok) {
        const post = await res.json();
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

// Thunk action to load all posts by name
export const loadCurrentSubredditPostsThunk = (subredditName) => async (dispatch) => {
    const res = await fetch(`/api/posts/subreddits/${subredditName}`)

    if (res.ok) {
        const posts = await res.json();
        return dispatch(loadPosts(posts))
    }
}

// Thunk action to creat a new post
export const createPostThunk = (postInfo) => async (dispatch) => {
    const res = await fetch(`/api/posts/subreddits/${postInfo.subreddit_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postInfo),
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createPost(data))
        return data
    }

    return null
}


// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadAllPosts = (state) => state.post;



// ------------------------------ REDUCERS ------------------------------ //

const initialState = {};

const postReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch(action.type) {
        case LOAD_POST:
            return Object.assign({}, newState, action.posts);
        case LOAD_POSTS:
            const allPosts = {"posts": {}};
            const postsArray = Object.values(action.posts.posts)

            postsArray.forEach(el => {
                allPosts["posts"][el.id] = el
            })

            return allPosts

            // return Object.assign({}, newState, action.posts);

        // case CREATE_POST:

        // case DELETE_POST:

        case CLEAR_POST:
            return initialState;

        default:
            return newState
    }

}

export default postReducer
