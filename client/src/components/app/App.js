import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";

import "./App.css";
import { check } from "../../http/userAPI";
import Header from "../header/Header";
import Auth from "../../pages/Auth";
import Catalog from "../../pages/Catalog";
import DevicePage from "../../pages/DevicePage";
import Error from "../../pages/Error";
import { onLogInAction, onLogOutAction } from "../../store/authReducer";
import AdminPanel from "../../pages/AdminPanel";
import FetchCatalogData from "../../hooks/fetchCatalogData";
import { addTypesAction } from "../../store/typesReducer";
import { addBrandsAction } from "../../store/brandsReducer";
import { addDevicesAction } from "../../store/devicesReducer";

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(async () => {
    try {
      const response = await check();

      const isLogged = localStorage.getItem("isLogged");
      if (!isLogged && !response) {
        dispatch(onLogOutAction());
        return setLoading(false);
      }

      const { typesData, brandsData, devicesData } = await FetchCatalogData();
      dispatch(addTypesAction(typesData));
      dispatch(addBrandsAction(brandsData));
      dispatch(addDevicesAction(devicesData));

      console.log("APP.JS FETCHED DATA === " + JSON.stringify(devicesData));

      setLoading(false);
      return dispatch(onLogInAction());
    } catch (e) {
      dispatch(onLogOutAction());
    }
  }, []);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="grow" />
      </div>
    );

  return (
    <div>
      <Router>
        <Header />
        <main style={{ minHeight: "100vh", padding: "15px" }}>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/registration" element={<Auth />} />
            <Route path="/device" element={<Catalog />} />
            <Route path="/device/:id" element={<DevicePage />} />
            <Route path="/adminPanel" element={<AdminPanel />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
