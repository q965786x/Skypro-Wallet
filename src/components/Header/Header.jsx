import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SHeader,
  SHeaderContent,
  SLogo,
  SLogoImg,
  SHeaderNav,
  SNavLink,
  SLogoutBtn,
} from "./Header.styled.js";

const Header = () => {
  const location = useLocation();
  const isExpensesPage = location.pathname === "/expenses";
  const isAnalysisPage = location.pathname === "/analysis";

  const handleLogout = () => {
    // Простой выход - перенаправляем на страницу входа
    window.location.href = "/sign-in";
  };

  return (
    <SHeader>
      <SHeaderContent>
        <SLogo as={Link} to="/">
          <SLogoImg src="/images/logo.png" alt="logo" />
        </SLogo>
        <SHeaderNav>
          <SNavLink
            as={Link}
            to="/expenses"
            className={isExpensesPage ? "active" : ""}
          >
            Мои расходы
          </SNavLink>
          <SNavLink
            as={Link}
            to="/analysis"
            className={isAnalysisPage ? "active" : ""}
          >
            Анализ расходов
          </SNavLink>
        </SHeaderNav>
        <SLogoutBtn onClick={handleLogout}>Выйти</SLogoutBtn>
      </SHeaderContent>
    </SHeader>
  );
};

export default Header;
