

import axios from "axios";

const API_URL = "http://localhost:5000";

// Fetch roles
export const fetchRoles = () => {
  return (dispatch) => {
    axios
      .get(`${API_URL}/roles`)
      .then((response) => {
        // console.log("Roles Data:", response.data); 
        dispatch({ type: "FETCH_ROLES_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ROLES_ERROR", error: error.message || "Failed to fetch roles" });
      });
  };
};

// Fetch permissions
export const fetchPermissions = () => {
  return (dispatch) => {
    axios
      .get(`${API_URL}/roles/rolePermissions`)
      .then((response) => {
        console.log("Fetched Permissions Response:", response.data);
        dispatch({
          type: "FETCH_PERMISSIONS_SUCCESS",
          payload: response.data.map((p) => ({ label: p.name, value: p._id })),
        });
      })
      .catch((error) => {
        console.error("Error fetching permissions:", error);
        dispatch({ type: "FETCH_PERMISSIONS_ERROR", error: error.message || "Failed to fetch permissions" });
      });
  };
};

// Add a new role
export const addRole = (payload) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/roles/addRole`, payload)
      .then((response) => {
        dispatch({ type: "ADD_ROLE_SUCCESS", payload: response.data });
        dispatch(fetchRoles());
      })
      .catch((error) => {
        dispatch({ type: "ADD_ROLE_ERROR", error: error.message || "Failed to add role" });
      });
  };
};

// Update an existing role
export const updateRole = (roleId, payload) => {
  return (dispatch) => {
    axios
      .put(`${API_URL}/roles/updateRole/${roleId}`, payload)
      .then((response) => {
        dispatch({ type: "UPDATE_ROLE_SUCCESS", payload: response.data });
        dispatch(fetchRoles()); // Optionally refetch roles after updating
      })
      .catch((error) => {
        console.error("Update Role Error:", error.response.data); // Log detailed error
        dispatch({ type: "UPDATE_ROLE_ERROR", error: error.message || "Failed to update role" });
      });
  };
};

// Delete a role
export const deleteRole = (roleId) => {
  return (dispatch) => {
    axios
      .delete(`${API_URL}/roles/deleteRole/${roleId}`)
      .then(() => {
        dispatch({ type: "DELETE_ROLE_SUCCESS", roleId });
        dispatch(fetchRoles());
      })
      .catch((error) => {
        dispatch({ type: "DELETE_ROLE_ERROR", error: error.message || "Failed to delete role" });
      });
  };
};

// Toggle role status (active/inactive)
export const toggleRole = (roleId, active) => {
  return (dispatch) => {
    axios
      .put(`${API_URL}/roles/toggleRole/${roleId}`, { active })
      .then(() => {
        dispatch({
          type: "TOGGLE_ROLE_SUCCESS",
          payload: { roleId, active },
        });
      })
      .catch((error) => {
        dispatch({ type: "TOGGLE_ROLE_ERROR", error: error.message || "Failed to toggle role status" });
      });
  };
};
