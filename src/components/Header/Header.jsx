import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  SHeader,
  SHeaderContent,
  SLogo,
  SLogoImg,
  SHeaderNav,
  SNavLink,
  SLogoutBtn,
  SMobileNavDropdown,
  SMobileNavButton,
  SMobileNavTriangle,
  SMobileNavModal,
  SMobileNavModalItem,
  SMobileNavModalOverlay,
} from "./Header.styled.js";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getCurrentPage = () => {
    const path = location.pathname;

    if (
      path === "/expenses" ||
      (path.startsWith("/expenses") && !path.includes("new"))
    ) {
      return "expenses"; // MainMobile
    }

    if (path === "/expenses/new") {
      return "new-expense"; // NewExpenseMobile
    }

    if (
      path === "/analysis" ||
      path === "/analysis/diagrams" ||
      path === "/analysis/calendar" ||
      path.includes("/analysis")
    ) {
      return "analysis"; // CostDiagramsMobile, CostCalendarMobile
    }

    return "expenses";
  };

  // Функция для получения текста навигации в зависимости от страницы
  const getNavTextForPage = (page) => {
    switch (page) {
      case "expenses":
        return "Мои расходы";
      case "new-expense":
        return "Новый расход";
      case "analysis":
        return "Анализ расходов";
      default:
        return "Мои расходы";
    }
  };

  // Функция для получения активного класса
  const isActivePage = (page) => {
    return getCurrentPage() === page;
  };

  const currentPage = getCurrentPage();
  const currentNavText = getNavTextForPage(currentPage);

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  // Обработчики для навигации
  const handleExpensesClick = () => {
    navigate("/expenses");
    setIsDropdownOpen(false);
  };

  const handleNewExpenseClick = () => {
    navigate("/expenses/new");
    setIsDropdownOpen(false);
  };

  const handleAnalysisClick = () => {
    navigate("/analysis/diagrams");
    setIsDropdownOpen(false);
  };

  const handleMobileNavClick = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  // Получаем текст для выпадающего меню
  const getCurrentNavText = () => {
    return currentNavText;
  };

  // Определяем, является ли текущая страница активной для выделения
  const isExpensesActive = isActivePage("expenses");
  const isAnalysisActive = isActivePage("analysis");

  return (
    <>
      {/* Основной Header */}
      <SHeader>
        <SHeaderContent>
          <SLogo as={Link} to="/">
            <SLogoImg
              src="/images/logo.png"
              alt="Skypro.Wallet"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML =
                  '<span style="font-weight: 700; color: #7334ea; font-size: 18px;">Skypro.Wallet</span>';
              }}
            />
          </SLogo>

          {/* Десктопная навигация */}
          <SHeaderNav $mobile={false}>
            <SNavLink
              as={Link}
              to="/expenses"
              className={isExpensesActive ? "active" : ""}
            >
              Мои расходы
              {isExpensesActive && <span className="nav-dot">●</span>}
            </SNavLink>
            <SNavLink
              as={Link}
              to="/analysis/diagrams"
              className={isAnalysisActive ? "active" : ""}
            >
              Анализ расходов
              {isAnalysisActive && <span className="nav-dot">●</span>}
            </SNavLink>
          </SHeaderNav>

          {/* Мобильная навигация - выпадающее меню */}
          {isMobile && (
            <SMobileNavDropdown>
              <SMobileNavButton
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                $active={isExpensesActive || isAnalysisActive}
              >
                {getCurrentNavText()}
                <SMobileNavTriangle $open={isDropdownOpen}>
                  ▼
                </SMobileNavTriangle>
              </SMobileNavButton>
            </SMobileNavDropdown>
          )}

          <SLogoutBtn onClick={handleLogout} title="Выйти из аккаунта">
            Выйти
          </SLogoutBtn>
        </SHeaderContent>
      </SHeader>

      {/* Модальное окно мобильной навигации */}
      {isMobile && isDropdownOpen && (
        <>
          <SMobileNavModalOverlay onClick={() => setIsDropdownOpen(false)} />
          <SMobileNavModal>
            <SMobileNavModalItem
              $active={isExpensesActive}
              $variant="primary"
              onClick={handleExpensesClick}
            >
              Мои расходы
            </SMobileNavModalItem>
            <SMobileNavModalItem
              $active={isActivePage("new-expense")}
              $variant="secondary"
              onClick={handleNewExpenseClick}
            >
              Новый расход
            </SMobileNavModalItem>
            <SMobileNavModalItem
              $active={isAnalysisActive}
              $variant="secondary"
              onClick={handleAnalysisClick}
            >
              Анализ расходов
            </SMobileNavModalItem>
          </SMobileNavModal>
        </>
      )}
    </>
  );
};

export default Header;
