import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { check, logIn, logOut } from "../../http/userAPI";

export const authCheckMiddleware = createAsyncThunk(
  "authentication/middleware",
  async () => {
    try {
      const data = await check();
      return data;
    } catch (e) {
      return {
        id: null,
        email: null,
        role: null,
      };
    }
  }
);

export const logoutMiddleware = createAsyncThunk(
  "logout/middleware",
  async () => {
    const data = await logOut();
    return data;
  }
);

export const loginMiddleware = createAsyncThunk(
  "login/middleware",
  async ({ email, password }) => {
    const response = await logIn({ email, password });
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      email: null,
      role: null,
      token: null,
    },
    loading: true,
    error: false,
  },
  extraReducers: {
    // Log in
    [loginMiddleware.pending]: state => {
      state.loading = true;
    },
    [loginMiddleware.fulfilled]: (state, action) => {
      const { id, email, role } = action.payload;

      state.user = { id, email, role };
      state.loading = false;
    },
    [loginMiddleware.rejected]: state => {
      state.loading = false;
      state.error = true;
    },

    // Log out
    [logoutMiddleware.pending]: state => {
      state.loading = true;
    },
    [logoutMiddleware.fulfilled]: state => {
      state.user = { id: null, email: null, role: null };
      state.loading = false;
    },
    [logoutMiddleware.rejected]: state => {
      state.loading = false;
      state.error = true;
    },

    // Checking authentication
    [authCheckMiddleware.pending]: state => {
      state.loading = true;
    },
    [authCheckMiddleware.fulfilled]: (state, action) => {
      const { id, email, role } = action.payload;

      state.user = { id, email, role };
      state.loading = false;
    },
    [authCheckMiddleware.rejected]: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: {
//       id: null,
//       email: null,
//       role: null,
//       token: null,
//     },
//     loading: true,
//     error: false,
//   },
//   reducers: {
//     setCredentials: (state, action) => {
//       const { id, email, role, token } = action.payload;
//       state.id = id;
//       state.email = email;
//       state.role = role;
//       state.token = token;
//     },
//     logOut: (state, action) => {
//       state.id = null;
//       state.email = null;
//       state.role = null;
//       state.token = null;
//     },
//   },
//   // extraReducers: {
//   //   // Log in
//   //   [loginMiddleware.pending]: state => {
//   //     state.loading = true;
//   //   },
//   //   [loginMiddleware.fulfilled]: (state, action) => {
//   //     const { id, email, role } = action.payload;

//   //     state.user = { id, email, role };
//   //     state.loading = false;
//   //   },
//   //   [loginMiddleware.rejected]: state => {
//   //     state.loading = false;
//   //     state.error = true;
//   //   },

//   //   // Log out
//   //   [logoutMiddleware.pending]: state => {
//   //     state.loading = true;
//   //   },
//   //   [logoutMiddleware.fulfilled]: state => {
//   //     state.user = { id: null, email: null, role: null };
//   //     state.loading = false;
//   //   },
//   //   [logoutMiddleware.rejected]: state => {
//   //     state.loading = false;
//   //     state.error = true;
//   //   },

//   //   // Checking authentication
//   //   [authCheckMiddleware.pending]: state => {
//   //     state.loading = true;
//   //   },
//   //   [authCheckMiddleware.fulfilled]: (state, action) => {
//   //     const { id, email, role } = action.payload;

//   //     state.user = { id, email, role };
//   //     state.loading = false;
//   //   },
//   //   [authCheckMiddleware.rejected]: state => {
//   //     state.loading = false;
//   //     state.error = true;
//   //   },
//   // },
// });

// export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
