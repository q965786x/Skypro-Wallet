import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  return <AuthForm isSignUp={true} />;
};

export default SignUp;


// Эти данные перенесены в файл Auth.jsx
/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  SErrorMessage,
} from "./SignUp.styled.js";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",    
  });


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    
    if (!formData.name.trim()) {
      validationErrors.name = "Имя обязательно";
    }
    
    if (!formData.email.trim()) {
      validationErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Неверный формат email";
    }

    if (!formData.password) {
        validationErrors.password = "Пароль обязателен";
      } else if (formData.password.length < 6) {
        validationErrors.password = "Пароль должен быть не менее 6 символов";
      }      
      
      return validationErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Форма отправлена');
    
    const validationErrors = validateForm();
    console.log('Ошибки валидации:', validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});

    console.log('Данные для отправки:', formData);

    try {
      console.log('Вызов register...');
      const result = await register(formData.name, formData.email, formData.password);
      console.log('Регистрация успешна:', result);
      
        // РЕДИРЕКТ ПОСЛЕ УСПЕШНОЙ РЕГИСТРАЦИИ
    navigate('/expenses');
    
    } catch (err) {
      console.log('Ошибка регистрации:', err);
      setErrors({
        general: err.message || "Ошибка при регистрации"
      });
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
        <SFormRegister>
          <SFormRegisterContainer>
            <SFormTitle>Регистрация</SFormTitle>

            
            {errors.success && (
              <div style={{ color: 'green', marginBottom: '15px' }}>
                ✅ {errors.success}
              </div>
            )}

            
            {errors.general && (
              <SErrorMessage>{errors.general}</SErrorMessage>
            )}


            <form onSubmit={handleSubmit}>
              <SFormGroup>
                <SFormLabel htmlFor="name"></SFormLabel>
                <SFormInput
                  type="text"
                  name="name"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={errors.name ? 'error' : ''}
                />  
                {errors.name && <SErrorMessage>{errors.name}</SErrorMessage>}                             
              </SFormGroup>

              <SFormGroup>
                <SFormLabel htmlFor="email"></SFormLabel>
                <SFormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? 'error' : ''}
                />   
                {errors.email && <SErrorMessage>{errors.email}</SErrorMessage>}             
              </SFormGroup>

              <SFormGroup>
                <SFormLabel htmlFor="password"></SFormLabel>
                <SFormInput
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={errors.password ? 'error' : ''}                
                />
                {errors.password && <SErrorMessage>{errors.password}</SErrorMessage>}                
              </SFormGroup>

              <SBtnRegister 
                type="submit" 
                disabled={isSubmitting}                
              >
                {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
              </SBtnRegister>
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

export default SignUp;*/
