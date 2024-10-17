import {
  FETCH_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_ROLES,
} from "../actions/userActions";

const initialState = {
  users: [],
  roles: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    case FETCH_ROLES:
      return { ...state, roles: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)),
      };
    case DELETE_USER:
      return { ...state, users: state.users.filter((user) => user._id !== action.payload) };
    default:
      return state;
  }
};

export default userReducer;


  