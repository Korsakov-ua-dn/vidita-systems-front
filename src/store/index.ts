import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articleReducer from "./article-slice";

const rootReducer = combineReducers({
  article: articleReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// types
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch