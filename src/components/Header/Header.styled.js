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
`;

export const SHeaderNav = styled.nav`
  //стили для .header__nav
  display: flex;
  align-items: center;
  gap: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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

export const SLogoutBtn = styled.button`
  //стили для .logout-btn
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

  &:hover {
    background: #7334ea;
    color: #ffffff;
  }
`;
