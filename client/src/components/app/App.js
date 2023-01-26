import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
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
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

import { check } from "../../http/userAPI";
import { onLogInAction, onLogOutAction } from "../../store/authReducer";
import { host } from "../../http";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path=""
        element={<Catalog />}
        loader={async () => {
          const { data: types } = await host.get("/api/type");
          const { data: brands } = await host.get("/api/brand");
          const { data: devices } = await host.get("/api/device");

          return {
            types,
            brands,
            devices,
          };
        }}
      />
      <Route path="login" element={<Auth />} />
      <Route path="registration" element={<Auth />} />

      <Route
        path="device/:deviceId"
        element={<DevicePage />}
        loader={async ({ params }) => {
          const { data } = await host.get(`/api/device/${params.deviceId}`);
          return data;
        }}
      />
      <Route
        path="adminPanel"
        element={<AdminPanel />}
        loader={async () => {
          const { data: brands } = await host.get("/api/brand");
          const { data: types } = await host.get("/api/type");

          return { brands, types };
        }}
      />
      <Route path="loading" element={<LoadingSpinner />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(async () => {
    try {
      const response = await check();

      const isLogged = localStorage.getItem("isLogged");
      if (isLogged && response) {
        // setLoading(false);
        return dispatch(onLogInAction());
      } else dispatch(onLogOutAction());
      // setLoading(false);
    } catch (e) {
      dispatch(onLogOutAction());
    }
    // eslint-disable-next-line
  }, []);

  return <RouterProvider router={appRouter} />;
};

export default App;
