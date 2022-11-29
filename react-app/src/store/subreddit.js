// ------------------------------- ACTIONS ------------------------------- //
const LOAD_SUBREDDIT = '/subreddits/LOAD_SUBREDDIT'
const LOAD_SUBREDDITS = '/subreddits/LOAD_SUBREDDITS'
const PUT_SUBREDDIT = '/subreddits/PUT_SUBREDDIT'
const CREATE_SUBREDDIT = '/subreddits/CREATE_SUBREDDIT'
const DELETE_SUBREDDIT = '/subreddits/DELETE_SUBREDDIT'

// Get one subreddit
export const loadSubreddit = (subredditId) => {
    return {
        type: LOAD_SUBREDDIT,
        subredditId
    }
}

// Get all subreddits
export const loadSubreddits = (subreddits) => {
    return {
        type: LOAD_SUBREDDITS,
        subreddits
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


// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadAllSubreddit = (state) => state.subreddits



// ------------------------------ REDUCERS ------------------------------ //

const initialState = {};

const subredditReducer = (state = initialState, action) => {
    const newState = {...state}

    switch(action.type) {
        case LOAD_SUBREDDIT:
            return Object.assign({}, newState, action.subreddits)
        case LOAD_SUBREDDITS:
            return Object.assign({}, newState, action.subreddits)
        default:
            return newState;
    }
}

export default subredditReducer;
