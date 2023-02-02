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

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path=""
        element={<Catalog />}
        loader={async () =>
          defer({
            types: await fetchTypes(),
            brands: await fetchBrands(),
            devices: await fetchDevices(),
          })
        }
      />
      <Route path="login" element={<Auth />} />
      <Route path="registration" element={<Auth />} />

      <Route
        path="device/:deviceId"
        element={<DevicePage />}
        loader={async ({ params }) => {
          console.log(params);
          return defer({ data: await fetchDevice(params.deviceId) });
        }}
      />
      <Route
        path="adminPanel"
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
