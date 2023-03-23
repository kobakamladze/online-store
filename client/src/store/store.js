import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";
import authSlice from "./slices/authSlice";
import { authApiSlice } from "./slices/authApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    user: authSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      authApiSlice.middleware,
    ]),
});

export default store;
