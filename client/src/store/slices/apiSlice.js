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
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: builder => ({
    // Authentication hooks
    auth: builder.query({
      query: () => "auth",
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "user/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    registration: builder.mutation({
      query: ({ email, password }) => ({
        url: "user/registration",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.query({
      query: () => "user/logout",
    }),

    // Data fetching hooks
    getTypes: builder.query({
      query: () => "type",
    }),
    getBrands: builder.query({
      query: () => "brand",
    }),
    getDevices: builder.query({
      query: ({ brandId = [], typeId = [], page = 1 }) => ({
        url: "device",
        params: { brandId, typeId, page },
      }),
    }),
    getSpecificDevice: builder.query({
      query: id => `device/${id}`,
    }),
  }),
});

export const {
  useAuthQuery,
  useLogoutQuery,
  useLoginMutation,
  useRegistrationMutation,
  useGetBrandsQuery,
  useGetTypesQuery,
  useGetDevicesQuery,
  useGetSpecificDeviceQuery,
} = apiSlice;
