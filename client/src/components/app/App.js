import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../header/Header";
import Auth from "../../pages/Auth";
import Catalog from "../../pages/Catalog";
import DevicePage from "../../pages/DevicePage";
import Error from "../../pages/Error";
import MainPage from "../../pages/MainPage";

import "./App.css";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/user/login" element={<Auth />} />
            <Route path="/device" element={<Catalog />} />
            <Route path="/device/:id" element={<DevicePage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
