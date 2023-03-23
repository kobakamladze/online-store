import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Auth from "../pages/Auth";
import Catalog from "../pages/Catalog";
import DevicePage from "../pages/DevicePage";
import Layout from "../layouts/Layout";
import Error from "../pages/Error";
import AdminPanel from "../pages/AdminPanel";
import CartPage from "../pages/CartPage";
import AuthRoute from "../layouts/AuthRoute";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

import { useAuthCheckQuery } from "../store/slices/authApiSlice";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Catalog />} />
      <Route path="device/:deviceId" element={<DevicePage />} />

      <Route path="login" element={<Auth />} />
      <Route path="registration" element={<Auth />} />

      <Route element={<AuthRoute />}>
        <Route path="cart/:userId" element={<CartPage />} />
      </Route>

      <Route element={<AuthRoute onlyForAdmins={true} />}>
        <Route path="admin-panel" element={<AdminPanel />} />
      </Route>

      <Route path="error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

const App = () => {
  const { isLoading } = useAuthCheckQuery();

  if (isLoading) return <LoadingSpinner />;

  return <RouterProvider router={appRouter} />;
};

export default App;
