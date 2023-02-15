import { configureStore } from "@reduxjs/toolkit";

import authorizationSlice from "./slices/authSlice";

const store = configureStore({
  reducer: { authorization: authorizationSlice },
});

export default store;
