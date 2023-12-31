"use client";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
// import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  value: {
    user: "",
    abxPurchaseRate: 0,
    abxBalance: 0,
    contract: null,
    currentCommunityScanning: "",
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      return {
        value: {
          ...state.value,
          user: action.payload,
        },
      };
    },
    signOut: (state, action) => {
      return {
        value: {
          ...state.value,
          user: "",
        },
      };
    },
    setAbxPurchaseRate: (state, action) => {
      return {
        value: {
          ...state.value,
          abxPurchaseRate: action.payload,
        },
      };
    },
    setAbxBalance: (state, action) => {
      return {
        value: {
          abxBalance: action.payload,
        },
      };
    },
    setContract: (state, action) => {
      return {
        value: {
          ...state.value,
          contract: action.payload,
        },
      };
    },
    setCurrentCommunityScanning: (state, action) => {
      return {
        value: {
          ...state.value,
          currentCommunityScanning: action.payload,
        },
      };
    },
    resetCurrentCommunityScanning: (state, action) => {
      return {
        value: {
          ...state.value,
          currentCommunityScanning: "",
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

export const {
  signIn,
  signOut,
  setAbxPurchaseRate,
  setAbxBalance,
  setContract,
  setCurrentCommunityScanning,
  resetCurrentCommunityScanning,
} = auth.actions;

export default auth.reducer;
