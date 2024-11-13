import { configureStore, combineReducers, Middleware } from "@reduxjs/toolkit";
import notes from "./reducers/notes";
import ui from "./reducers/ui";
import { LOCALSTORAGE_KEY } from "../constants.ts";
import { RootState } from "../types.ts";
import user from "./reducers/user.ts";
import { account } from "../appwrite/appwrite.ts";

const persistenceMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storeAPI.getState()));
  return result;
};

let preloadedState: RootState | undefined;

try {
  const storedState = localStorage.getItem(LOCALSTORAGE_KEY);
  if (storedState) {
    preloadedState = JSON.parse(storedState) as RootState;

    try {
      // TODO probably should live in a separate module
      const user = await account.get();
      console.log("user", user);

      preloadedState.user = {
        email: user.email,
        name: user.name,
        id: user.$id,
      };
    } catch (e) {
      // For now, nothing
    }
  }
} catch (error) {
  console.error("Failed to load state from localStorage:", error);
  preloadedState = undefined;
}

const rootReducer = combineReducers({
  notes,
  ui,
  user,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export default store;
