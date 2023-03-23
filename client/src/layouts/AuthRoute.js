import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = props => {
  const user = useSelector(state => state.user);

  const id = user?.id;
  const email = user?.email;
  const role = user?.role;

  const onlyForAdmins = props?.onlyForAdmins ?? false;

  if (onlyForAdmins && role !== "ADMIN") {
    return <Navigate to="/error" />;
  }

  return id && email ? (
    <Outlet />
  ) : (
    <Navigate to="/login?redirectedFromAuthMiddleware=true" />
  );
};

export default AuthRoute;
