import { createStore } from "redux";

export interface Store {
  sidebarShow: String;
}

const initialState = {
  sidebarShow: "responsive",
};

const sideNavState = (state: Store = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(sideNavState);
export default store;
