import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";
import authSlice from "./slices/authSlice";
import { authApiSlice } from "./slices/authApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    // [authSlice.name]: authSlice.reducer,
    user: authSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      authApiSlice.middleware,
      // authSlice.middleware,
    ]),
});

export default store;
