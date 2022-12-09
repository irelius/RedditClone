// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const LOAD_USERS = "session/LOAD_USERS"

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const loadAllUserThunk = () => async (dispatch) => {
  const res = await fetch('/api/users')

  if(res.ok) {
    const users = await res.json()
    dispatch(loadUsers(users))
    return users
  }
}

// ------------------------- SELECTOR FUNCTIONS ------------------------- //

export const loadAllUsers = (state) => state.session



// ------------------------------ REDUCERS ------------------------------ //


const sessionReducer = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case LOAD_USERS:
      // const allUsers = {"users": {}}

      // const usersArray = Object.values(action.users)

      // usersArray.forEach(el => {
      //   allUsers["users"][el.id] = el
      // })

      // return allUsers

      return Object.assign({}, newState, action.users)

    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}

export default sessionReducer
