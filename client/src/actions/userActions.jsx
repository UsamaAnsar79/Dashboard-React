// actions/userActions.js
import axios from 'axios';

// Action Types
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';

// Action Creators
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const deleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  payload: id,
});

export const fetchRolesSuccess = (roles) => ({
  type: FETCH_ROLES_SUCCESS,
  payload: roles,
});

// Thunks
export const fetchUsers = () => async (dispatch) => {
  const response = await axios.get('http://localhost:3001/users');
  dispatch(fetchUsersSuccess(response.data));
};

export const fetchRoles = () => async (dispatch) => {
  const response = await axios.get('http://localhost:3001/roles');
  dispatch(fetchRolesSuccess(response.data));
};

export const addUser = (newUser) => async (dispatch) => {
  const response = await axios.post('http://localhost:3001/users', newUser);
  dispatch(addUserSuccess(response.data.user));
};

export const updateUser = (id, updatedUser) => async (dispatch) => {
  const response = await axios.put(`http://localhost:3001/users/${id}`, updatedUser);
  dispatch(updateUserSuccess(response.data.user));
};

export const deleteUser = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/users/${id}`);
  dispatch(deleteUserSuccess(id));
};
