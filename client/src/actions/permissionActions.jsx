
export const FETCH_PERMISSIONS = "FETCH_PERMISSIONS";
export const ADD_PERMISSION = "ADD_PERMISSION";
export const UPDATE_PERMISSION = "UPDATE_PERMISSION";
export const DELETE_PERMISSION = "DELETE_PERMISSION";
export const TOGGLE_PERMISSION = "TOGGLE_PERMISSION";

export const fetchPermissions = (permissions) => ({
  type: FETCH_PERMISSIONS,
  payload: permissions,
});

export const addPermission = (permission) => ({
  type: ADD_PERMISSION,
  payload: permission,
});

export const updatePermission = (oldPermission, newPermission) => ({
  type: UPDATE_PERMISSION,
  payload: { oldPermission, newPermission },
});

export const deletePermission = (permission) => ({
  type: DELETE_PERMISSION,
  payload: permission,
});

export const togglePermission = (permission) => ({
  type: TOGGLE_PERMISSION,
  payload: permission,
});
