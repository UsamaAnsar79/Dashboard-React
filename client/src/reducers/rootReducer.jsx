import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sidebarReducer from "./sidebarReducer";
import permissionsReducer from './permissionReducer';
import rolesReducer from './rolesReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer,
    permissions:permissionsReducer,
    roles:rolesReducer,
    user:userReducer
});

export default rootReducer;


