import styled from "styled-components";

export const SHeader = styled.header`
  //стили для .header
  display: flex;
  align-items: center;
  padding: 0 80px;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 16px !important;
    height: 56px !important;
  }
`;

export const SHeaderContent = styled.div`
  // Контейнер для центрирования навигации
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SLogo = styled.a`
  //стили для .logo
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const SLogoImg = styled.img`
  //стили для .logo__img
  height: 32px;
  width: auto;

  @media (max-width: 768px) {
    height: 14px !important; /* Точная высота по ТЗ */
    width: 109px !important; /* Точная ширина по ТЗ */
    object-fit: contain;
  }
`;

// Обновляем SHeaderNav для поддержки мобильной версии
export const SHeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (min-width: 769px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    flex-direction: ${(props) => (props.$mobile ? "column" : "row")};
    gap: ${(props) => (props.$mobile ? "20px" : "40px")};
    align-items: ${(props) => (props.$mobile ? "flex-start" : "center")};
    margin: ${(props) => (props.$mobile ? "0 0 40px 0" : "0")};
    display: ${(props) => (props.$mobile ? "flex" : "none")};

    &:not($mobile) {
      display: none;
    }
  }
`;

export const SNavLink = styled.a`
  //стили для .nav-link
  font-weight: ${(props) =>
    props.className?.includes("active") ? "600" : "400"};
  font-size: 16px;
  color: ${(props) =>
    props.className?.includes("active") ? "#000000" : "#000000"};
  text-decoration: ${(props) =>
    props.className?.includes("active") ? "underline" : "none"};
  text-decoration-color: #7334ea;
  text-underline-offset: 8px;
  text-decoration-thickness: 2px;
  position: relative;
  padding: 8px 0;
  transition: all 0.3s ease;

  &:hover {
    font-weight: 600;
    color: #7334ea;
    text-decoration: underline;
    text-decoration-color: #7334ea;
  }
`;

// Обновляем SLogoutBtn для мобильной версии
export const SLogoutBtn = styled.button`
  background: transparent;
  border: 1px solid #7334ea;
  border-radius: 6px;
  padding: 8px 24px;
  font-weight: 500;
  font-size: 14px;
  color: #7334ea;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  height: 38px; 

  &:hover {
    background: #7334ea;
    color: #ffffff;
  }

  @media (max-width: 768px) {

    height: 18px !important; /* Точная высота по ТЗ */
    min-height: 18px;
    padding: 0 12px !important; /* Общая высота 18px, padding сверху/снизу по 0 */
    font-size: 10px !important;
    border-radius: 4px;

    ${props => props.$mobile ? `
      margin-top: auto;
      width: 100%;
      height: 32px !important; /* Для мобильного меню больше */
      padding: 6px 0 !important;
      font-size: 14px !important;
    ` : ''}
  }
`;

export const SMobileMenuBtn = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  z-index: 1001;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #000000;
    border-radius: 2px;
    transition: all 0.3s ease;

    &:nth-child(1) {
      transform: ${(props) =>
        props.$close ? "rotate(45deg) translate(5px, 5px)" : "none"};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.$close ? "0" : "1")};
    }

    &:nth-child(3) {
      transform: ${(props) =>
        props.$close ? "rotate(-45deg) translate(7px, -6px)" : "none"};
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const SMobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const SMobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: #ffffff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    from {
      right: -100%;
    }
    to {
      right: 0;
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const SHeaderMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e7;

  @media (max-width: 768px) {
    .SLogoImg {
      height: 14px !important;
      width: 109px !important;
    }
  }
`;


