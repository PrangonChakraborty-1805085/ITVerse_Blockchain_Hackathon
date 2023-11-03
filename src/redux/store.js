"use client"
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import authReducer from "./features/auth-slice";
import thunk from "redux-thunk";

//wrapper
// import { createWrapper } from "next-redux-wrapper";

const persistConfig = {
  key: "root",
  storage: storageSession,
  // storage,
};
// const persistedPlanReducer = persistReducer(persistConfig, planReducer);
// const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedEditPlanReducer = persistReducer(persistConfig, editPlanReducer);
export const store = configureStore({
  reducer: {
    // persistedPlanReducer,
    persistedAuthReducer,
    // persistedEditPlanReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
