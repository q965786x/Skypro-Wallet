import styled from "styled-components";

export const SFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px); /* Учитываем высоту header */
  padding: 20px;
  background-color: #f5f5f7;

  @media (max-width: 768px) {
    padding: 16px;
    justify-content: center;
    margin-top: 0;
    background-color: #ffffff;
    min-height: calc(100vh - 56px);
  }
`;

export const SFormContainer = styled.div`
  width: 379px;
  height: ${(props) => {
    if (props.$hasError) {
      return props.$isSignUp ? "440px" : "385px"; // Высота с ошибкой
    }
    return props.$isSignUp ? "385px" : "334px"; // Стандартная высота
  }};
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: height 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 343px;
    height: auto;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const SFormContent = styled.div`
  width: 100%;
  height: ${(props) => {
    if (props.$hasError) {
      return props.$isSignUp ? "369px" : "318px"; // Высота с ошибкой
    }
    return props.$isSignUp ? "321px" : "270px"; // Стандартная высота
  }};
  display: flex;
  flex-direction: column;
  transition: height 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-width: 343px;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-height: ${(props) => {
      if (props.$hasError) {
        return props.$isSignUp ? "369px" : "318px";
      }
      return props.$isSignUp ? "321px" : "270px";
    }};
    margin: 0 auto;
  }
`;

export const SFormTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  color: #000000;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

export const SFormGroup = styled.div`
  width: 100%;
  margin-bottom: 12px;
  position: relative;
`;

export const SFormInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border: 1px solid
    ${(props) => {
      if (props.$error) return "#ff4444";
      if (props.$filled) return "#7334ea";
      return "#ccc";
    }};
  border-radius: 6px;
  gap: 12px;
  font-size: 12px;
  color: #000000;
  transition: all 0.3s ease;
  background-color: ${(props) => {
    if (props.$error) return "#fff0f0";
    if (props.$filled) return "#f5f0ff";
    return "#fff";
  }};
  padding-right: 30px; /* Место для звездочки */

  &::placeholder {
    font-weight: 400;
    font-size: 12px;
    color: #999999;
  }

  &:focus {
    border-color: ${(props) => (props.$error ? "#ff4444" : "#7334ea")};
    outline: none;
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$error ? "rgba(255, 68, 68, 0.1)" : "rgba(115, 52, 234, 0.1)"};
  }

  @media (max-width: 768px) {
    height: 42px;
    font-size: 12px;

    &::placeholder {
      font-size: 12px;
    }
  }
`;

export const SFormLink = styled.div`
  text-align: center;
  color: #999999;
  font-weight: 400;
  font-size: 12px;
  font-family: inherit;
  margin-top: 24px; /* Расстояние между полями */

  a {
    color: #7334ea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 24px;
  }
`;

export const BaseButton = styled.button`
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  height: 38px;
  background-color: ${(props) => {
    if (props.$disabled) return "#cccccc";
    if (props.$hasError) return "#cccccc"; // Серый при ошибках полей
    return "#7334ea"; // Фиолетовый по умолчанию
  }};
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  color: ${(props) => {
    if (props.$disabled) return "#666666";
    if (props.$hasError) return "#666666";
    return "#ffffff";
  }};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  margin-top: 24px;
  margin-bottom: 0;
  transition: all 0.3s ease;
  opacity: 1;

  &:hover {
    background-color: ${(props) => {
      if (props.$disabled) return "#cccccc";
      if (props.$hasError) return "#cccccc";
      return "#5a2bb8";
    }};
  }

  &:active {
    transform: ${(props) =>
      props.$disabled || props.$hasError ? "none" : "scale(0.98)"};
  }

  @media (max-width: 768px) {
    height: 42px; /* Точная высота по ТЗ */
    font-size: 12px;
    margin-top: 24px; /* Расстояние между полями */
    font-weight: 600;
  }
`;

export const SHeader = styled.header`
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
    background-color: #f4f5f6; /* Серый фон для мобильного header */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

export const SLogo = styled.a`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const SLogoImg = styled.img`
  height: 32px;
  width: auto;

  @media (max-width: 768px) {
    height: 14px !important;
    width: 109px !important;
    object-fit: contain;
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;
  padding: 8px 12px;
  background-color: #fff0f0;
  border: 1px solid #ffcccc;
  border-radius: 6px;
  color: #ff4444;
  font-size: 12px;
  margin-bottom: 12px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;
    margin-top: 12px;
    margin-bottom: 0;
  }
`;

export const InputErrorIndicator = styled.span`
  color: #ff4444;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: ${(props) => (props.$show ? "block" : "none")};

  @media (max-width: 768px) {
    right: 10px;
  }
`;
