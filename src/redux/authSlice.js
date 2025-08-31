import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authChecked = true;
    },
    logout: (state) => {
      state.user = null;
      state.authChecked = true;
    },
    setAuthChecked: (state) => {
      state.authChecked = true;
    },
  },
});

export const { setUser, logout, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
