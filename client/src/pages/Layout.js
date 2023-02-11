import { useContext, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { AuthorizedContext } from "../components/app/App";

import Header from "../components/header/Header";

const Layout = () => {
  const response = useLoaderData();
  const setAuthorized = useContext(AuthorizedContext)[1];

  useEffect(
    () => {
      if (response?.id && response?.email && response?.role)
        setAuthorized(() => ({
          id: response.id,
          email: response.email,
          role: response.role,
        }));
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", padding: "15px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
