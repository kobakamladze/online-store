import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Await, Outlet, useLoaderData } from "react-router-dom";

import Header from "../components/header/Header";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import { onLogInAction, onLogOutAction } from "../store/authReducer";

const Layout = () => {
  // const { isLogged } = useLoaderData();
  // console.log("IS LOGGED === " + isLogged);
  // const dispatch = useDispatch();

  // if (isLogged) {
  //   dispatch(onLogInAction());
  // } else {
  //   dispatch(onLogOutAction());
  // }

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
