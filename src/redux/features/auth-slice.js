"use client";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
// import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  value: {
    user: "",
    abxPurchaseRate: 0,
    abxBalance: 0,
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      return {
        value: {
          // ...state.value,
          user: action.payload,
        },
      };
    },
    signOut: (state, action) => {
      return {
        value: {
          // ...state.value,
          user: "",
        },
      };
    },
    setAbxPurchaseRate: (state, action) => {
      return {
        value: {
          // ...state.value,
          abxPurchaseRate: action.payload,
        },
      };
    },
    setAbxBalance: (state, action) => {
      return {
        value: {
          // ...state.value,
          abxBalance: action.payload,
        },
      };
    },
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },
  },
});

export const { signIn, signOut, setAbxPurchaseRate, setAbxBalance } =
  auth.actions;

export default auth.reducer;