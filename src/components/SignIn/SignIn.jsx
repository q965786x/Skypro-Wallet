import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  return <AuthForm isSignUp={false} />;
};

export default SignIn;


//Данная информация перенесена в файл Auth.jsx
/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  SErrorMessage,
} from "./SignIn.styled.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "Эл. почта обязательна";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Неверный формат email";
    }
    
    if (!password) {
      newErrors.password = "Пароль обязателен";
    } else if (password.length <3) {
      newErrors.password = "Пароль должен содержать минимум 3 символа";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setErrors({ general: result.error || "Ошибка авторизации" });
      }
    } catch (error) {
      setErrors({ general: "Произошла ошибка. Попробуйте еще раз." });
    } finally {
      setIsSubmitting(false);
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

            {errors.general && (
              <SErrorMessage>{errors.general}</SErrorMessage>
            )}


            <form onSubmit={handleSubmit}>
              <SFormGroup>
                <SFormLabel htmlFor="email"></SFormLabel>
                <SFormInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="Эл. почта"
                  required
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <SErrorMessage>{errors.email}</SErrorMessage>}                
              </SFormGroup>

              <SFormGroup>
                <SFormLabel htmlFor="password"></SFormLabel>
                <SFormInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="Введите ваш пароль"
                  required
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <SErrorMessage>{errors.password}</SErrorMessage>}                
              </SFormGroup>

              <SBtnLogin 
                type="submit"
                disabled={isSubmitting}
                >
                  {isSubmitting ? "Вход..." : "Войти"}
                </SBtnLogin>
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

export default SignIn;*/
