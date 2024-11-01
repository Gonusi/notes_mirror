import { configureStore, Middleware } from "@reduxjs/toolkit";
import notes from "./reducers/notes";
import { LOCALSTORAGE_KEY } from "../constants.ts";
import { RootState } from "../types.ts";

const persistenceMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storeAPI.getState()));
  return result;
};

let preloadedState: RootState | undefined;

// TODO move to indexDB
try {
  const storedState = localStorage.getItem(LOCALSTORAGE_KEY);
  if (storedState) {
    preloadedState = JSON.parse(storedState) as RootState;
  }
} catch (error) {
  console.error("Failed to load state from localStorage:", error);
  preloadedState = undefined;
}

const store = configureStore({
  reducer: {
    notes,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export default store;
