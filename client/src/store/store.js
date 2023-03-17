import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

import authorizationSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authorization: authorizationSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
