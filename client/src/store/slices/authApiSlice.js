import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwt_decode from "jwt-decode";

import { logOut, setCredentials } from "./authSlice";

const authQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  credentials: "same-origin",
  prepareHeaders: (headers, { extra }) => {
    const token = extra?.isRefreshingToken
      ? localStorage.getItem("refreshToken")
      : localStorage.getItem("accessToken");
    if (token) headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

const authQueryWithRetry = async (args, api, extraOptions) => {
  let result = await authQuery(args, api, extraOptions);

  if (result?.data?.authorized) {
    api.dispatch(
      setCredentials(jwt_decode(localStorage.getItem("accessToken")))
    );

    return result;
  }

  if (result?.error?.status === 401) {
    console.log("Sending refreshToken");

    // request for new access token
    let refreshResult = await authQuery(
      "user/refresh",
      { ...api, extra: { isRefreshingToken: true } },
      extraOptions
    );

    if (refreshResult?.data) {
      localStorage.setItem("accessToken", refreshResult.data.accessToken);
      localStorage.setItem("refreshToken", refreshResult.data.refreshToken);

      const { id, email, role } = jwt_decode(
        localStorage.getItem("accessToken")
      );

      api.dispatch(setCredentials({ id, email, role }));
      result = await authQuery(args, api, extraOptions);
    } else {
      localStorage.clear();
      api.dispatch(logOut());

      result = await authQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const authApiSlice = createApi({
  reducerPath: "authorization",
  baseQuery: authQueryWithRetry,
  tagTypes: ["cart"],
  endpoints: builder => ({}),
});

export const {
  useAuthCheckQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useFetchCartItemsQuery,
} = authApiSlice.injectEndpoints({
  endpoints: builder => ({
    authCheck: builder.query({
      query: () => "user/auth",
    }),
    fetchCartItems: builder.query({
      query: userId => `cart/${userId}`,
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: ({ deviceId, userId }) => ({
        url: `cart/add/${deviceId}`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: ({ deviceId, userId }) => ({
        url: `cart/delete/${deviceId}`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});
