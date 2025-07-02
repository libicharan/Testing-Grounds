// src/Lib/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import counterReducer from "./features/counterSlice"; // your slice

// 1️⃣ Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
});

// 2️⃣ Persist config
const persistConfig = {
  key: "root",
  storage,
};

// 3️⃣ Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Create store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Required for redux-persist
      }),
  });
};

// 5️⃣ Infer types from store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
