import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: builder => ({
    // Authentication hooks
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
    // logout: builder.query({
    //   query: () => "user/logout",
    // }),

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
    getSingleDevice: builder.query({
      query: id => `device/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetBrandsQuery,
  useGetTypesQuery,
  useGetDevicesQuery,
  useGetSingleDeviceQuery,
} = apiSlice;
