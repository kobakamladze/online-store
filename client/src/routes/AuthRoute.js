import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const user = useSelector(state => state.user);

  const id = user?.id;
  const email = user?.email;

  return id && email ? (
    <Outlet />
  ) : (
    <Navigate to="/login?redirectedFromAuthMiddleware=true" />
  );
};

export default AuthRoute;
