// reducers/authReducer.js
const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), 
  user: JSON.parse(localStorage.getItem('user')) || null, 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');  
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
