import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./components/Home/Home.tsx";
import TaskDetails from "./components/TaskDetails/TaskDetails.tsx";
import About from "./components/About.tsx";
import NotFound from "./components/NotFound.tsx";
import Counter from "./components/Counter.tsx";
import Timer from "./components/Timer.tsx";
import Calculation from "./components/Calculation.tsx";
import ColorGenerator from "./components/ColorGenerator.tsx";
import ColorPicker from "./components/ColorPicker.tsx";
import ColorSpectrumGenerator from "./components/ColorSpectrumGenerator.tsx";
import LoginRegister from "./components/LoginRegister.tsx";
import LogoutButton from "./components/LogoutButton.tsx";

const App: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const isLoginRegisterPage = location.pathname === "/loginRegister";

  return (
    <>
      {isLoggedIn && !isLoginRegisterPage && <Header />}

      <Routes>
        <Route path="/loginRegister" element={<LoginRegister />} />

        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/calculation" element={<Calculation />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/colorGenerator" element={<ColorGenerator />} />
            <Route path="/colorPicker" element={<ColorPicker />} />
            <Route path="/colorSpectrumGenerator" element={<ColorSpectrumGenerator />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/loginRegister" replace />} />
        )}
      </Routes>

      {isLoggedIn && !isLoginRegisterPage && <LogoutButton />}
    </>
  );
};

export default App;
