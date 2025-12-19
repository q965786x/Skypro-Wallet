import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SHeader, SLogo, SLogoImg } from "../Header/Header.styled.js";
import {
  SFormWrapper,
  SFormLogin,
  SFormLoginContainer,
  SFormTitle,
  SFormGroup,
  SFormLabel,
  SFormInput,
  SBtnLogin,
  SFormLink,
  SAuthLink,
} from "./SignIn.styled.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Простая проверка - если заполнены оба поля
    if (email && password) {
      navigate("/expenses");
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  };

  return (
    <div className="auth-page">
      <SHeader>
        <SLogo as={Link} to="/">
          <SLogoImg src="/images/logo.png" alt="logo" />
        </SLogo>
      </SHeader>

      <SFormWrapper>
        <SFormLogin>
          <SFormLoginContainer>
            <SFormTitle>Вход</SFormTitle>
            <form onSubmit={handleSubmit}>
              <SFormGroup>
                <SFormLabel htmlFor="email"></SFormLabel>
                <SFormInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Эл. почта"
                  required
                />
              </SFormGroup>

              <SFormGroup>
                <SFormLabel htmlFor="password"></SFormLabel>
                <SFormInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите ваш пароль"
                  required
                />
              </SFormGroup>

              <SBtnLogin type="submit">Войти</SBtnLogin>
            </form>

            <SFormLink>
              <SAuthLink as={Link} to="/sign-up">
                Нужно зарегистрироваться? Регистрируйтесь здесь
              </SAuthLink>
            </SFormLink>
          </SFormLoginContainer>
        </SFormLogin>
      </SFormWrapper>
    </div>
  );
};

export default SignIn;
