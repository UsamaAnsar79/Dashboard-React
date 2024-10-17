import axios from "axios";

export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const FETCH_ROLES = "FETCH_ROLES";

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    dispatch({ type: FETCH_USERS, payload: response.data });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const fetchRoles = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/roles");
    dispatch({ type: FETCH_ROLES, payload: response.data });
  } catch (error) {
    console.error("Error fetching roles:", error);
  }
};

export const addUser = (newUser) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users", newUser);
    dispatch({ type: ADD_USER, payload: response.data });
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const updateUser = (updatedUser) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser);
    dispatch({ type: UPDATE_USER, payload: response.data.user });
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
