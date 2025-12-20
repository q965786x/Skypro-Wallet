import React from "react";
import {
  SFormLogin,
  SFormLoginContainer,
  SFormTitle,
  SFormGroup,
  SFormLabel,
  SFormInput,
  SBtnLogin,
  SFormLink,
  SAuthLink,
} from "./SignIn.styled";

<SFormLogin>
  <SFormLoginContainer>
    <SFormTitle>Вход</SFormTitle>

    <SFormGroup>
      <SFormLabel>Эл. почта</SFormLabel>
      <SFormInput
        type="email"
        id="loginEmail"
        className="form-input"
        placeholder="Введите вашу почту"
      />
    </SFormGroup>

    <SFormGroup>
      <SFormLabel>Пароль</SFormLabel>
      <SFormInput
        type="password"
        id="loginPassword"
        className="form-input"
        placeholder="Введите ваш пароль"
      />
    </SFormGroup>

    <SBtnLogin>Войти</SBtnLogin>

    <SFormLink>
      <SAuthLink>Нужно зарегистрироваться? Регистрируйтесь здесь</SAuthLink>
    </SFormLink>
  </SFormLoginContainer>
</SFormLogin>;
