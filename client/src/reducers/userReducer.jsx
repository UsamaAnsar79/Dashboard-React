// reducers/userReducer.js
import {
    FETCH_USERS_SUCCESS,
    ADD_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    FETCH_ROLES_SUCCESS,
  } from '../actions/userActions';
  
  const initialState = {
    users: [],
    roles: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return { ...state, users: action.payload };
      case ADD_USER_SUCCESS:
        return { ...state, users: [...state.users, action.payload] };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user
          ),
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter((user) => user._id !== action.payload),
        };
      case FETCH_ROLES_SUCCESS:
        return { ...state, roles: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  