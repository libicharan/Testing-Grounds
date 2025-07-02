import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./features/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
});

const persistConfig = {
  key: "counter",
  storage,
  whitelist: ["counter"], // Only counter is persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
