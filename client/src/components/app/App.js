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

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(async () => {
    try {
      const response = await check();

      const isLogged = localStorage.getItem("isLogged");
      if (isLogged && response) {
        setLoading(false);
        return dispatch(onLogInAction());
      }

      dispatch(onLogOutAction());
      setLoading(false);
    } catch (e) {
      dispatch(onLogOutAction());
    }
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <div className="m-auto">
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
