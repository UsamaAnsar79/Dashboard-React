
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_EXPAND = "TOGGLE_EXPAND";
export const SET_ACTIVE_ITEM = "SET_ACTIVE_ITEM";

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const toggleExpand = () => ({
  type: TOGGLE_EXPAND,
});

export const setActiveItem = (item) => ({
  type: SET_ACTIVE_ITEM,
  payload: item,
});
