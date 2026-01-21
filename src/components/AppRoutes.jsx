import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMobile } from "../hooks/useMobile";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Cost from "./Cost/Cost";
import MainMobile from "../components/Main/MainMobile";
import NewExpenseMobile from "../components/Main/NewExpenseMobile";
import CostCalendarMobile from "../components/Cost/CostCalendarMobile";
import CostDiagramsMobile from "../components/Cost/CostDiagramsMobile";


function AppRoutes() {
  const { token, isCheckingAuth } = useAuth();
  const { isMobile } = useMobile();

  if (isCheckingAuth) {
    return <div>Загрузка...</div>;
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

        {/* Маршруты для расходов */}
        <Route
          path="/expenses"
          element={token ? (isMobile ? <MainMobile /> : <Main />) : <Navigate to="/sign-in" />}
        />
        <Route
          path="/expenses/new"
          element={token ? (isMobile ? <NewExpenseMobile /> : <Navigate to="/expenses" />) : <Navigate to="/sign-in" />}
        />

        {/* Маршруты для анализа */}
        <Route
          path="/analysis"
          element={token ? (isMobile ? <CostCalendarMobile /> : <Cost />) : <Navigate to="/sign-in" />}
        />
        <Route
          path="/analysis/diagrams"
          element={token ? (isMobile ? <CostDiagramsMobile /> : <Navigate to="/analysis" />) : <Navigate to="/sign-in" />}
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
