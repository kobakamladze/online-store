import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";

const Layout = () => {
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
