// ------------------------------- ACTIONS ------------------------------- //
const LOAD_SUBREDDIT = '/subreddits/LOAD_SUBREDDIT'
const LOAD_SUBREDDITS = '/subreddits/LOAD_SUBREDDITS'
// const PUT_SUBREDDIT = '/subreddits/PUT_SUBREDDIT'
const CREATE_SUBREDDIT = '/subreddits/CREATE_SUBREDDIT'
// const DELETE_SUBREDDIT = '/subreddits/DELETE_SUBREDDIT'
const CLEAR_SUBREDDIT = '/subreddits/CLEAR_SUBREDDIT'

// Get one subreddit
export const loadSubreddit = (subreddit) => {
    return {
        type: LOAD_SUBREDDIT,
        subreddit
    }
}

// Get all subreddits
export const loadSubreddits = (subreddits) => {
    return {
        type: LOAD_SUBREDDITS,
        subreddits
    }
}

export const createSubreddit = (subreddit) => {
    return {
        type: CREATE_SUBREDDIT,
        subreddit
    }
}

export const clearSubreddit = () => {
    return {
        type: CLEAR_SUBREDDIT
    }
}

// ------------------------------- THUNKS ------------------------------- //

// Thunk action to load a specific subreddit
export const loadSubredditThunk = (subredditId) => async (dispatch) => {
    const res = await fetch (`/api/subreddits/${subredditId}`)

    if (res.ok) {
        const subreddit = await res.json()
        dispatch(loadSubreddit(subreddit))
        return subreddit
    }
}

// Thunk action to load subreddit detail matching name
export const loadCurrentSubredditThunk = (subredditName) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/${subredditName}`)

    if (res.ok) {
        const subreddit = await res.json()
        return dispatch(loadSubreddit(subreddit))
    }
}

// Thunk action to load all subreddits
export const loadSubredditsThunk = () => async (dispatch) => {
    const res = await fetch ("/api/subreddits")

    if (res.ok) {
        const subreddits = await res.json();
        dispatch(loadSubreddits(subreddits))
        return subreddits
    }
}



// export const loadPopularSubredditsThunk = () => async (dispatch) => {
//     const res = await fetch ("/api/subreddits")
// }


// Thunk action to create subreddit
export const createSubredditThunk = (subredditInfo) => async (dispatch) => {
    const res = await fetch(`/api/subreddits/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subredditInfo),
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createSubreddit(data))
        return data;
    }

    return null
}



// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadAllSubreddit = (state) => state.subreddits



// ------------------------------ REDUCERS ------------------------------ //

const initialState = {};

const subredditReducer = (state = initialState, action) => {
    const newState = {...state}

    switch(action.type) {
        case LOAD_SUBREDDIT:
            return Object.assign({}, newState, action.subreddit)

        case LOAD_SUBREDDITS:
            return Object.assign({}, newState, action.subreddits)

        case CREATE_SUBREDDIT:
            return Object.assign({}, newState, action.subreddits)

        case CLEAR_SUBREDDIT:
            return initialState

        default:
            return newState;
    }
}

export default subredditReducer;
