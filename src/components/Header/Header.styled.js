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
    padding: 0 16px;
    height: 56px;
    background-color: #f4f5f6; /* Мобильные - серый #F4F5F6 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    justify-content: space-between;
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

  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 12px;
  }
`;

export const SLogo = styled.a`
  //стили для .logo
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-right: auto;
  }
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

export const SHeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    display: none;
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

  .nav-dot {
    color: #7334ea;
    font-size: 12px;
  }

  &.active {
    font-weight: 600;
    color: #000000;
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

    ${(props) =>
      props.$mobile
        ? `
      margin-top: auto;
      width: 100%;
      height: 32px !important; /* Для мобильного меню больше */
      padding: 6px 0 !important;
      font-size: 14px !important;
    `
        : ""}
  }
`;

/* Мобильная навигация - выпадающее меню */
export const SMobileNavDropdown = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex: 1;
    max-width: 180px;
    margin: 0 12px;
  }
`;

export const SMobileNavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  background-color: ${props => props.$active ? '#f1ebfd' : '#f4f5f6'};
  border: 1px solid #e5e5e7;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  color: ${props => props.$active ? '#7334ea' : '#000000'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$active ? '#e8dffb' : '#e8e8e8'};
  }
`;

export const SMobileNavTriangle = styled.span`
  font-size: 8px;
  color: ${props => props.$open ? '#7334ea' : '#999999'};
  transform: ${props => props.$open ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
  margin-left: 4px;
`;

/* Модальное окно выпадающего меню */
export const SMobileNavModalOverlay = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const SMobileNavModal = styled.div`
  position: fixed;
  top: 88px; /* 56px (Header) + 32px (кнопка) */
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 300px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 999;
  overflow: hidden;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const SMobileNavModalItem = styled.div`
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: ${props => {
    if (props.$variant === 'primary') return '#7334ea';
    return '#000000';
  }};
  background-color: ${props => {
    if (props.$variant === 'primary' && props.$active) return '#f1ebfd';
    if (props.$variant === 'secondary') return '#f4f5f6';
    return '#ffffff';
  }};
  
  &:hover {
    background-color: ${props => {
      if (props.$variant === 'primary') return '#f1ebfd';
      return '#e8e8e8';
    }};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e7;
  }
`;