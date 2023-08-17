import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice.js";
import commonSlice from "../utils/commonSlice.js";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Use the persisted state when creating the Redux store
const persistedState = loadState();

const rootReducer = {
  userInfo: userSlice,
  commonSlice: commonSlice,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

// Subscribe to store changes and save the state to localStorage
store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  localStorage.setItem("reduxState", serializedState);
});

export default store;
