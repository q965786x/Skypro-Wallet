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
  SMobileMenuBtn,
  SMobileMenu,
  SMobileMenuOverlay,
  SHeaderMobile,
} from "./Header.styled.js";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isExpensesPage = location.pathname === "/expenses";
  const isAnalysisPage = location.pathname === "/analysis";

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Текст кнопки для мобильных
  const logoutText = isMobile ? "Выйти" : "Выйти";


  return (
    <>
      <SHeader>
        <SHeaderContent>
          <SLogo as={Link} to="/">
            <SLogoImg 
              src="/images/logo.png" 
              alt="logo"
              onError={(e) => {
                // Fallback если изображение не загрузилось
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span style="font-weight: 700; color: #7334ea; font-size: 18px;">ExpenseTracker</span>';
              }}
            />
          </SLogo>

          {/* Десктопная навигация */}
          <SHeaderNav $mobile={false}>
            <SNavLink
              as={Link}
              to="/expenses"
              className={isExpensesPage ? "active" : ""}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Мои расходы
            </SNavLink>
            <SNavLink
              as={Link}
              to="/analysis"
              className={isAnalysisPage ? "active" : ""}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Анализ расходов
            </SNavLink>
          </SHeaderNav>

          {/* Мобильное меню - кнопка */}
          <SMobileMenuBtn onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </SMobileMenuBtn>

          <SLogoutBtn onClick={handleLogout} title="Выйти из аккаунта">
            {logoutText}
          </SLogoutBtn>
        </SHeaderContent>
      </SHeader>

      {/* Мобильное меню (открывается поверх контента) */}
      {isMobileMenuOpen && (
        <>
          <SMobileMenuOverlay onClick={toggleMobileMenu} />
          <SMobileMenu>
            <SHeaderMobile>
              <SLogo as={Link} to="/" onClick={toggleMobileMenu}>
                <SLogoImg src="/images/logo.png" alt="logo" />
              </SLogo>
              <SMobileMenuBtn onClick={toggleMobileMenu} $close={true}>
                <span></span>
                <span></span>
              </SMobileMenuBtn>
            </SHeaderMobile>

            <SHeaderNav $mobile={true}>
              <SNavLink
                as={Link}
                to="/expenses"
                className={isExpensesPage ? "active" : ""}
                onClick={toggleMobileMenu}
              >
                Мои расходы
              </SNavLink>
              <SNavLink
                as={Link}
                to="/analysis"
                className={isAnalysisPage ? "active" : ""}
                onClick={toggleMobileMenu}
              >
                Анализ расходов
              </SNavLink>
            </SHeaderNav>

            <SLogoutBtn 
              onClick={handleLogout} 
              $mobile={true}
              style={{ height: '32px', marginTop: 'auto' }}
            >
              Выйти из аккаунта
            </SLogoutBtn>
          </SMobileMenu>
        </>
      )}
    </>
  );
};

export default Header;
