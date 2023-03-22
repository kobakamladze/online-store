import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  defer,
} from "react-router-dom";

import "./App.css";
import Auth from "../pages/Auth";
import Catalog from "../pages/Catalog";
import DevicePage from "../pages/DevicePage";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import AdminPanel from "../pages/AdminPanel";

import { fetchDevice } from "../http/deviceAPI";
import CartPage from "../pages/CartPage";
import { fetchCartItems } from "../http/cartAPI";
import AuthRoute from "../routes/AuthRoute";
// import { authCheckMiddleware } from "../store/slices/authSlice";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { useAuthCheckQuery } from "../store/slices/authApiSlice";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Catalog />} />
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
        <Route path="admin-panel" element={<AdminPanel />} />
      </Route>

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
