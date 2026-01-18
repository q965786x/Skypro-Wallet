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

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isExpensesPage = location.pathname === "/expenses";
  const isAnalysisPage = location.pathname === "/analysis";

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  // Обработчик для "Мои расходы"
  const handleExpensesClick = () => {
    navigate("/expenses");
    setIsDropdownOpen(false);
  };

  // Обработчик для "Новый расход"
  const handleNewExpenseClick = () => {
    navigate("/expenses#new-expense");
    setIsDropdownOpen(false);
  };

  // Обработчик для "Анализ расходов"
  const handleAnalysisClick = () => {
    navigate("/analysis#diagrams");
    setIsDropdownOpen(false);
  };

  const handleMobileNavClick = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  // Определяем текущий выбранный пункт
  const getCurrentNavText = () => {
    if (isExpensesPage) return "Мои расходы";
    if (isAnalysisPage) return "Анализ расходов";
    return "Мои расходы"; // по умолчанию
  };

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
                // Fallback если изображение не загрузилось
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
              className={isExpensesPage ? "active" : ""}
            >
              Мои расходы
              {isExpensesPage && <span className="nav-dot">●</span>}
            </SNavLink>
            <SNavLink
              as={Link}
              to="/analysis"
              className={isAnalysisPage ? "active" : ""}
            >
              Анализ расходов
              {isAnalysisPage && <span className="nav-dot">●</span>}
            </SNavLink>
          </SHeaderNav>

          {/* Мобильная навигация - выпадающее меню */}
          {isMobile && (
            <SMobileNavDropdown>
              <SMobileNavButton
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                $active={isExpensesPage || isAnalysisPage}
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
              $active={isExpensesPage}
              $variant="primary"
              onClick={handleExpensesClick}
            >
              Мои расходы
            </SMobileNavModalItem>
            <SMobileNavModalItem
              $active={false}
              $variant="secondary"
              onClick={handleNewExpenseClick}
            >
              Новый расход
            </SMobileNavModalItem>
            <SMobileNavModalItem
              $active={isAnalysisPage}
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
