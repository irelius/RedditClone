// ------------------------------- ACTIONS ------------------------------- //
const LOAD_POST = '/posts/LOAD_POST'
const LOAD_POSTS = '/posts/LOAD_POSTS'
const CREATE_POST = '/posts/CREATE_POST'
const PUT_POST = '/posts/PUT_POST'
const DELETE_POST = '/posts/DELETE_POST'
const CLEAR_POST = "/posts/CLEAR_POST"

// Get one post
export const loadPost = (post) => {
    return {
        type: LOAD_POST,
        post
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

// Update a post
export const updatePost = (post) => {
    return {
        type: PUT_POST,
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
        const posts = await res.json();
        dispatch(loadPost(posts))
        return posts
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
        dispatch(loadPosts(posts))
        return posts
    }
}


// Thunk action to load all posts by specific username
export const loadUserPostsThunk = (username) => async (dispatch) => {
    const res = await fetch(`/api/posts/users/${username}`)

    if (res.ok) {
        const posts = await res.json()
        dispatch(loadPosts(posts))
        return posts
    }
}

// Thunk action to create a new post
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
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }

    return null
}

// Thunk action to update an existing post
export const putPostThunk = (postInfo, post) => async (dispatch) => {
    const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postInfo)
    })

    console.log('booba', res.ok)

    if (res.ok) {
        const data = await res.json();
        dispatch(updatePost(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }

    return null
}

// Thunk action to delete a post
export const deletePostThunk = (post) => async (dispatch) => {
    const postId = Object.values(post)[0]["id"]

    const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deletePost(postId))
    }

    return null;
}


// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadAllPosts = (state) => state.post;



// ------------------------------ REDUCERS ------------------------------ //

const initialState = {};

const postReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case LOAD_POST:
            return Object.assign({}, newState, action.post);
        case LOAD_POSTS:
            const allPosts = { "posts": {} };

            if (action.posts.posts === "No posts") {

            } else {
                const postsArray = Object.values(action.posts.posts)
                postsArray.forEach(el => {
                    allPosts["posts"][el.id] = el
                })
                return allPosts
            }
        /* falls through */

        case CREATE_POST:
            return newState

        case PUT_POST:
            return Object.assign({}, newState, action.post)

        case DELETE_POST:
            const deletedPost = { ...newState }
            delete deletedPost[action.postId]
            return deletedPost

        case CLEAR_POST:
            return initialState;

        default:
            return newState
    }

}

export default postReducer
