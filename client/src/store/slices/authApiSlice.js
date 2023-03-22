import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwt_decode from "jwt-decode";

import { logOut, setCredentials } from "./authSlice";

const authQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const { id, email, role } = getState().user;

    const token =
      id && email && role
        ? localStorage.getItem("accessToken")
        : localStorage.getItem("refreshToken");
    if (token) headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

const authQueryWithRetry = async (args, api, extraOptions) => {
  let result = await authQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Sending refreshToken");

    // retrying for new access token
    let refreshResult = await authQuery("user/refresh", api, extraOptions);

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
  endpoints: builder => ({}),
});

export const { useAuthCheckQuery } = authApiSlice.injectEndpoints({
  endpoints: builder => ({
    authCheck: builder.query({
      query: () => "user/auth",
    }),
  }),
});
