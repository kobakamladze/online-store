import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authorization",
  initialState: {
    id: null,
    email: null,
    role: null,
  },

  reducers: {
    setCredentials: (state, action) => {
      const { id, email, role } = action.payload;
      state.id = id;
      state.email = email;
      state.role = role;
    },
    logOut: (state, action) => {
      state.id = null;
      state.email = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice;
