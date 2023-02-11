import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import { createContext, useState } from "react";

import "./App.css";
import Auth from "../../pages/Auth";
import Catalog from "../../pages/Catalog";
import DevicePage from "../../pages/DevicePage";
import Layout from "../../pages/Layout";
import Error from "../../pages/Error";
import AdminPanel from "../../pages/AdminPanel";

import { check } from "../../http/userAPI";
import fetchBrands from "../../http/brandAPI";
import fetchTypes from "../../http/typeAPI";
import { fetchDevices, fetchDevice } from "../../http/deviceAPI";
import CartPage from "../../pages/CartPage";
import { fetchCartItems } from "../../http/cartAPI";
import AuthRoute from "../../routes/AurthRoute";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      loader={async () => {
        try {
          const authCheck = await check();
          const id = authCheck?.id;
          const email = authCheck?.email;

          console.log(authCheck);

          return id && email ? authCheck : null;
        } catch (e) {
          console.log(e);
        }
      }}
    >
      <Route
        path=""
        element={<Catalog />}
        loader={async () => ({
          types: await fetchTypes(),
          brands: await fetchBrands(),
          devices: await fetchDevices(),
        })}
      />
      <Route
        path="device/:deviceId"
        element={<DevicePage />}
        loader={({ params }) => defer({ data: fetchDevice(params.deviceId) })}
      />

      <Route path="login" element={<Auth />} />
      <Route path="registration" element={<Auth />} />

      <Route element={<AuthRoute />} loader={() => check()}>
        <Route
          path="cart/:userId"
          element={<CartPage />}
          loader={({ params }) => fetchCartItems(params.userId)}
        />
        <Route
          path="admin-panel"
          element={<AdminPanel />}
          loader={async () =>
            defer({
              brands: await fetchBrands(),
              types: await fetchTypes(),
            })
          }
        />
      </Route>

      <Route path="*" element={<Error />} />
    </Route>
  )
);

export const AuthorizedContext = createContext();

const App = () => {
  const [authorized, setAuthorized] = useState({
    id: null,
    email: null,
    role: null,
  });

  return (
    <AuthorizedContext.Provider value={[authorized, setAuthorized]}>
      <RouterProvider router={appRouter} />
    </AuthorizedContext.Provider>
  );
};

export default App;
