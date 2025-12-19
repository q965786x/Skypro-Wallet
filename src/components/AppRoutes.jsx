import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";
import Cost from "./Cost/Cost";
import Header from "./Header/Header";

function AppRoutes() {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Защищенные маршруты (с Header) */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <Main />
          </>
        }
      />
      <Route
        path="/expenses"
        element={
          <>
            <Header />
            <Main />
          </>
        }
      />
      <Route
        path="/analysis"
        element={
          <>
            <Header />
            <Cost />
          </>
        }
      />

      {/* Перенаправление по умолчанию */}
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
}

export default AppRoutes;
