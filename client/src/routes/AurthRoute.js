import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const AuthRoute = () => {
  let authed = false;

  const authData = useLoaderData();

  const id = authData?.id;
  const email = authData?.email;
  if (id && email) authed = true;
  else authed = false;

  return authed ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
