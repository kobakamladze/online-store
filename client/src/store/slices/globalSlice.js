import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    email: null,
    role: null,
  },
  loading: true,
  error: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    auth: () => {},
    defaultState: state => (state = initialState),
  },
});

export const { setUser, defaultState } = globalSlice.actions;

export default globalSlice.reducer;
