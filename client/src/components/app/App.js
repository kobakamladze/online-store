import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  defer,
} from "react-router-dom";

import "./App.css";
import Auth from "../../pages/Auth";
import Catalog from "../../pages/Catalog";
import DevicePage from "../../pages/DevicePage";
import Layout from "../../pages/Layout";
import Error from "../../pages/Error";
import AdminPanel from "../../pages/AdminPanel";

import fetchBrands from "../../http/brandAPI";
import fetchTypes from "../../http/typeAPI";
import { fetchDevices, fetchDevice } from "../../http/deviceAPI";
import CartPage from "../../pages/CartPage";
import { fetchCartItems } from "../../http/cartAPI";
import AuthRoute from "../../routes/AurthRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authCheckMiddleware } from "../../store/slices/authSlice";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

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
      <Route
        path="device/:deviceId"
        element={<DevicePage />}
        loader={({ params }) => defer({ data: fetchDevice(params.deviceId) })}
      />

      <Route path="login" element={<Auth />} />
      <Route path="registration" element={<Auth />} />

      <Route element={<AuthRoute />}>
        <Route
          path="cart/:userId"
          element={<CartPage />}
          loader={({ params }) => fetchCartItems(params.userId)}
          errorElement={<div>Error</div>}
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

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.authorization);

  useEffect(() => {
    dispatch(authCheckMiddleware());
    // eslint-disable-next-line
  }, []);

  if (loading) return <LoadingSpinner />;

  return <RouterProvider router={appRouter} />;
};

export default App;
