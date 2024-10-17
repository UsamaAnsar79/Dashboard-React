

import axios from 'axios';

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const LOGOUT = 'LOGOUT';

// Action creators
export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const signupSuccess = (user, token) => ({
  type: SIGNUP_SUCCESS,
  payload: { user, token },
});
// Action for logging out
export const logout = () => (dispatch) => {
  // Remove token and user data from local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Dispatch logout action
  dispatch({ type: LOGOUT });
};

// Action for logging in
export const login = (email, password) => async (dispatch) => {
  console.log("Login payload:", { email, password });
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      { email, password },
      { withCredentials: true }
    );
    
    console.log("Login response:", response.data);

    if (response.status === 200) {
      const { id, name, token } = response.data;
      
      // Save token and user data to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, name }));

      dispatch(loginSuccess({ id, name }, token)); // Send token and user data
    }
  } catch (error) {
    console.error('Login failed:', error);
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    }
  }
};

// Action for signing up
export const signup = (name, email, password) => async (dispatch) => {
  console.log("Signup request payload:", { name, email, password }); // Check the payload

  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });

    if (response.status === 201) {
      const { id, name, token } = response.data;
      
      // Save token and user data to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, name }));

      dispatch(signupSuccess({ id, name }, token));
    }
  } catch (error) {
    console.error('Signup failed:', error);
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    }
  }
};
