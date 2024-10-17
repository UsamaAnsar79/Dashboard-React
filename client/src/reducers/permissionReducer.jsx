// // reducer.js
// import {
//     FETCH_PERMISSIONS,
//     ADD_PERMISSION,
//     UPDATE_PERMISSION,
//     DELETE_PERMISSION,
//     TOGGLE_PERMISSION,
//   } from "../actions/permissionActions.jsx";
  
//   const initialState = {
//     permissions: [],
//   };
  
//   const permissionsReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case FETCH_PERMISSIONS:
//         return { ...state, permissions: action.payload };
//       case ADD_PERMISSION:
//         return { ...state, permissions: [...state.permissions, action.payload] };
//       case UPDATE_PERMISSION:
//         return {
//           ...state,
//           permissions: state.permissions.map((permission) =>
//             permission.name === action.payload.oldPermission
//               ? { ...permission, name: action.payload.newPermission }
//               : permission
//           ),
//         };
//       case DELETE_PERMISSION:
//         return {
//           ...state,
//           permissions: state.permissions.filter(
//             (permission) => permission.name !== action.payload
//           ),
//         };
//       case TOGGLE_PERMISSION:
//         return {
//           ...state,
//           permissions: state.permissions.map((permission) =>
//             permission.name === action.payload.name
//               ? { ...permission, active: !permission.active }
//               : permission
//           ),
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default permissionsReducer;
import {
    FETCH_PERMISSIONS,
    ADD_PERMISSION,
    UPDATE_PERMISSION,
    DELETE_PERMISSION,
    TOGGLE_PERMISSION,
} from "../actions/permissionActions";

const initialState = {
    permissions: [],
};

const permissionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PERMISSIONS:
            console.log("Fetching permissions:", action.payload); // Log fetched permissions
            return { ...state, permissions: action.payload };
        case ADD_PERMISSION:
            console.log("Adding permission:", action.payload);
            return { ...state, permissions: [...state.permissions, action.payload] };
        case UPDATE_PERMISSION:
            console.log("Updating permission:", action.payload);
            return {
                ...state,
                permissions: state.permissions.map((permission) =>
                    permission.name === action.payload.oldPermission
                        ? { ...permission, name: action.payload.newPermission }
                        : permission
                ),
            };
        case DELETE_PERMISSION:
            console.log("Deleting permission:", action.payload);
            return {
                ...state,
                permissions: state.permissions.filter(
                    (permission) => permission.name !== action.payload
                ),
            };
        case TOGGLE_PERMISSION:
            console.log("Toggling permission:", action.payload);
            return {
                ...state,
                permissions: state.permissions.map((permission) =>
                    permission.name === action.payload.name
                        ? { ...permission, active: !permission.active }
                        : permission
                ),
            };
        default:
            return state;
    }
};

export default permissionsReducer;
