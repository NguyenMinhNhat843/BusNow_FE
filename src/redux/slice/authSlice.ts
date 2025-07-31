"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  role: string;
}

interface AuthState {
  user: User | null;
}

const inittialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: inittialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    updateProfile(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, updateProfile, setUser } = authSlice.actions;
export default authSlice.reducer;
