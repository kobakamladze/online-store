import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import Auth from "../../pages/Auth";
import Catalog from "../../pages/Catalog";
import DevicePage from "../../pages/DevicePage";
import Layout from "../../pages/Layout";
import Error from "../../pages/Error";
import AdminPanel from "../../pages/AdminPanel";

import { check } from "../../http/userAPI";
import { onLogInAction, onLogOutAction } from "../../store/authReducer";
import fetchBrands from "../../http/brandAPI";
import fetchTypes from "../../http/typeAPI";
import { fetchDevices, fetchDevice } from "../../http/deviceAPI";
import CartPage from "../../pages/CartPage";
import { fetchCartItems } from "../../http/cartAPI";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path=""
        element={<Catalog />}
        loader={async () => ({
          types: await fetchTypes(),
          brands: await fetchBrands(),
          devices: await fetchDevices(),
        })}
      />
      <Route path="login" element={<Auth />} />
      <Route path="registration" element={<Auth />} />

      <Route
        path="device/:deviceId"
        element={<DevicePage />}
        loader={({ params }) => defer({ data: fetchDevice(params.deviceId) })}
      />
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
      <Route path="*" element={<Error />} />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      async function checkAuth() {
        try {
          const { id, email } = await check();
          const isLogged = localStorage.getItem("isLogged");

          if (isLogged && id && email) {
            return dispatch(onLogInAction({ id, email }));
          } else {
            dispatch(onLogOutAction());
          }
        } catch (e) {
          dispatch(onLogOutAction());
        }
      }
      checkAuth();
    },
    // eslint-disable-next-line
    []
  );

  return <RouterProvider router={appRouter} />;
};

export default App;
