"use client"
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
// import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  value: {
    user: "",
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

export const { signIn, signOut } = auth.actions;

export default auth.reducer;
