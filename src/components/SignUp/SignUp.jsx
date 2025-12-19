import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SHeader, SLogo, SLogoImg } from "../Header/Header.styled.js";
import {
  SFormWrapper,
  SFormRegister,
  SFormRegisterContainer,
  SFormTitle,
  SFormGroup,
  SFormLabel,
  SFormInput,
  SBtnRegister,
  SFormLink,
  SAuthLink,
} from "./SignUp.styled.js";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    // Простая регистрация
    navigate("/expenses");
  };

  return (
    <div className="auth-page">
      <SHeader>
        <SLogo as={Link} to="/">
          <SLogoImg src="/images/logo.png" alt="logo" />
        </SLogo>
      </SHeader>

      <SFormWrapper>
        <SFormRegister>
          <SFormRegisterContainer>
            <SFormTitle>Регистрация</SFormTitle>
            <form onSubmit={handleSubmit}>
              <SFormGroup>
                <SFormLabel htmlFor="name"></SFormLabel>
                <SFormInput
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя"
                  required
                />
              </SFormGroup>

              <SFormGroup>
                <SFormLabel htmlFor="email"></SFormLabel>
                <SFormInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Эл. почту"
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

              <SBtnRegister type="submit">Зарегистрироваться</SBtnRegister>
            </form>

            <SFormLink>
              <SAuthLink as={Link} to="/sign-in">
                Уже есть аккаунт? Войдите здесь
              </SAuthLink>
            </SFormLink>
          </SFormRegisterContainer>
        </SFormRegister>
      </SFormWrapper>
    </div>
  );
};

export default SignUp;
