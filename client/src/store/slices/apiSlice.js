// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { check, logIn, logOut } from "../../http/userAPI";

// export const authCheckMiddleware = createAsyncThunk(
//   "authentication/middleware",
//   async () => {
//     try {
//       const data = await check();
//       return data;
//     } catch (e) {
//       return {
//         id: null,
//         email: null,
//         role: null,
//       };
//     }
//   }
// );

// export const logoutMiddleware = createAsyncThunk(
//   "logout/middleware",
//   async () => {
//     const data = await logOut();
//     return data;
//   }
// );

// export const loginMiddleware = createAsyncThunk(
//   "login/middleware",
//   async ({ email, password }) => {
//     const response = await logIn({ email, password });
//     return response;
//   }
// );

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: builder => ({
    auth: builder.query({
      query: () => "auth",
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
    }),
    registration: builder.mutation({
      query: ({ email, password }) => ({
        url: "registration",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.query({
      query: () => "logout",
    }),
  }),
});

export const {
  useAuthQuery,
  useLogoutQuery,
  useLoginMutation,
  useRegistrationMutation,
} = apiSlice;
