
const initialState = {
  roles: [],
  permissions: [],
  error: null,
  permissionsError: null, 
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ROLES_SUCCESS":
      return { ...state, roles: action.payload };

    case "FETCH_PERMISSIONS_SUCCESS":
      return { ...state, permissions: action.payload, permissionsError: null }; 

    case "ADD_ROLE_SUCCESS":
      return { ...state, roles: [...state.roles, action.payload] };

    case "UPDATE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role._id === action.payload._id ? { ...role, ...action.payload } : role
        ),
      };

    case "TOGGLE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role._id === action.payload.roleId ? { ...role, active: !role.active } : role
        ),
      };

    case "DELETE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.filter((role) => role._id !== action.payload),
      };

    // Include permissions error handling
    case "FETCH_PERMISSIONS_ERROR":
      return { ...state, permissionsError: action.error }; // Separate error for permissions

    case "FETCH_ROLES_ERROR":
    case "ADD_ROLE_ERROR":
    case "UPDATE_ROLE_ERROR":
    case "DELETE_ROLE_ERROR":
    case "TOGGLE_ROLE_ERROR":
      return { ...state, error: action.error }; // General error for roles

    default:
      return state;
  }
};

export default rolesReducer;
