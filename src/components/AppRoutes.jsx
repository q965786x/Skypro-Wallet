import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import Main from "./Main/Main";
import Cost from "./Cost/Cost";
import Header from "./Header/Header";

function AppRoutes() {
  const { token, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <>
      {token && <Header />}
      <Routes>
        {/* Публичные маршруты */}
        <Route
          path="/sign-in"
          element={token ? <Navigate to="/expenses" /> : <SignInPage />}
        />
        <Route
          path="/sign-up"
          element={token ? <Navigate to="/expenses" /> : <SignUpPage />}
        />

        {/* Защищенные маршруты */}
        <Route path="/" element={<Navigate to="/expenses" />} />
        <Route
          path="/expenses"
          element={token ? <Main /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/analysis"
          element={token ? <Cost /> : <Navigate to="/sign-in" />}
        />

        {/* Перенаправление */}
        <Route
          path="*"
          element={<Navigate to={token ? "/expenses" : "/sign-in"} />}
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
