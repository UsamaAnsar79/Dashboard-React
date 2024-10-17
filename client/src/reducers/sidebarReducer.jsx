// sidebarReducer.js
import { TOGGLE_SIDEBAR, TOGGLE_EXPAND, SET_ACTIVE_ITEM } from '../actions/sidebarActions';

const initialState = {
  isOpen: false,
  isExpanded: false,
  activeItem: "/dashboard",
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isOpen: !state.isOpen };
    case TOGGLE_EXPAND:
      return { ...state, isExpanded: !state.isExpanded };
    case SET_ACTIVE_ITEM:
      return { ...state, activeItem: action.payload };
    default:
      return state;
  }
};

export default sidebarReducer;
