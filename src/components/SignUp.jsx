import React from "react";
import {
  SFormRegister,
  SFormRegisterContainer,
  SFormTitle,
  SFormGroup,
  SFormLabel,
  SFormInput,
  SBtnRegister,
  SFormLink,
  SAuthLink,
} from "./SignUp.styled";

<SFormRegister>
  <SFormRegisterContainer>
    <SFormTitle>Регистрация</SFormTitle>

    <SFormGroup>
      <SFormLabel>Эл. почта</SFormLabel>
      <SFormInput
        type="email"
        id="registerEmail"
        className="form-input"
        placeholder="Введите вашу почту"
      />
    </SFormGroup>

    <SFormGroup>
      <SFormLabel>Пароль</SFormLabel>
      <SFormInput
        type="password"
        id="registerPassword"
        className="form-input"
        placeholder="Создайте пароль"
      />
    </SFormGroup>

    <SFormGroup>
      <SFormLabel>Подтвердите пароль</SFormLabel>
      <SFormInput
        type="password"
        id="confirmPassword"
        className="form-input"
        placeholder="Повторите пароль"
      />
    </SFormGroup>

    <SBtnRegister>Зарегистрироваться</SBtnRegister>

    <SFormLink>
      <SAuthLink>Уже есть аккаунт? Войдите здесь</SAuthLink>
    </SFormLink>
  </SFormRegisterContainer>
</SFormRegister>;
