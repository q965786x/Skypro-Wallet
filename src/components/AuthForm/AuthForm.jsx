import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signIn, signUp } from "../../services/auth";
import {
  SFormWrapper,
  SFormContainer,
  SFormContent,
  SFormTitle,
  SFormGroup,
  SFormInput,
  SFormLink,
  BaseButton,
  SHeader,
  SLogo,
  SLogoImg,
  ErrorMessage,
  InputErrorIndicator,
} from "./AuthForm.styled.js";

const AuthForm = ({ isSignUp }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    if (name === "email") {
      return value.includes("@") && value.trim() !== "";
    }
    if (name === "password") {
      return value.length >= 3;
    }
    if (name === "name" && isSignUp) {
      return value.trim() !== "";
    }
    return true;
  };

  const validateAllFields = () => {
    const newErrors = { name: false, email: false, password: false };
    let hasError = false;

    if (isSignUp && !validateField("name", formData.name)) {
      newErrors.name = true;
      hasError = true;
    }

    if (!validateField("email", formData.email)) {
      newErrors.email = true;
      hasError = true;
    }

    if (!validateField("password", formData.password)) {
      newErrors.password = true;
      hasError = true;
    }

    setFieldErrors(newErrors);

    setTouchedFields({
      name: true,
      email: true,
      password: true,
    });

    return !hasError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: false,
      });
    }

    if (formError) {
      setFormError("");
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const value = formData[name];

    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });

    if (value.trim()) {
      const isValid = validateField(name, value);
      if (isValid !== !fieldErrors[name]) {
        setFieldErrors({
          ...fieldErrors,
          [name]: !isValid,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormError("");

    if (!validateAllFields()) {
      setFormError(
        "Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const data = isSignUp
        ? await signUp({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        : await signIn({
            login: formData.email,
            password: formData.password,
          });

      if (data && data.user && data.token) {
        login(data.user, data.token);

        navigate("/expenses", { replace: true });
      } else {
        throw new Error("Некорректные данные от сервера");
      }
    } catch (err) {
      setFormError(
        err.message ||
          "Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.",
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldFilled = (fieldName) => {
    const value = formData[fieldName];
    return value.trim() !== "" && validateField(fieldName, value);
  };

  const shouldShowError = (fieldName) => {
    if (!touchedFields[fieldName]) return false;

    const value = formData[fieldName];

    if (fieldName === "name" && !isSignUp) return false;

    if (value.trim() === "") return true;

    return !validateField(fieldName, value);
  };

  const hasFieldErrors = () => {
    return Object.values(fieldErrors).some((error) => error === true);
  };

  const isFormValid = () => {
    if (hasFieldErrors()) return false;

    if (formError) return false;

    const emailValid = validateField("email", formData.email);
    const passwordValid = validateField("password", formData.password);
    const nameValid = isSignUp ? validateField("name", formData.name) : true;

    return emailValid && passwordValid && nameValid;
  };

  return (
    <div className="auth-page">
      <SHeader>
        <SLogo as={Link} to="/">
          <SLogoImg src="/images/logo.png" alt="logo" />
        </SLogo>
      </SHeader>

      <SFormWrapper>
        <SFormContainer $isSignUp={isSignUp} $hasError={formError}>
          <SFormContent $isSignUp={isSignUp} $hasError={formError}>
            <SFormTitle>{isSignUp ? "Регистрация" : "Вход"}</SFormTitle>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <SFormGroup>
                  <SFormInput
                    $error={shouldShowError("name")}
                    $filled={isFieldFilled("name")}
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  {shouldShowError("name") && (
                    <InputErrorIndicator $show={true}>*</InputErrorIndicator>
                  )}
                </SFormGroup>
              )}

              <SFormGroup>
                <SFormInput
                  $error={shouldShowError("email")}
                  $filled={isFieldFilled("email")}
                  type="email"
                  name="email"
                  placeholder="Эл. почта"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                {shouldShowError("email") && (
                  <InputErrorIndicator $show={true}>*</InputErrorIndicator>
                )}
              </SFormGroup>

              <SFormGroup>
                <SFormInput
                  $error={shouldShowError("password")}
                  $filled={isFieldFilled("password")}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                {shouldShowError("password") && (
                  <InputErrorIndicator $show={true}>*</InputErrorIndicator>
                )}
              </SFormGroup>

              {formError && <ErrorMessage>{formError}</ErrorMessage>}

              <BaseButton
                type="submit"
                $fullWidth={true}
                $disabled={!isFormValid || isSubmitting}
                $hasError={hasFieldErrors() || formError}
              >
                {isSubmitting
                  ? "Загрузка..."
                  : isSignUp
                    ? "Зарегистрироваться"
                    : "Войти"}
              </BaseButton>
            </form>

            <SFormLink>
              {!isSignUp ? (
                <p>
                  Нужно зарегистрироваться?{" "}
                  <Link to="/sign-up">Регистрируйтесь здесь</Link>
                </p>
              ) : (
                <p>
                  Уже есть аккаунт? <Link to="/sign-in">Войдите здесь</Link>
                </p>
              )}
            </SFormLink>
          </SFormContent>
        </SFormContainer>
      </SFormWrapper>
    </div>
  );
};

export default AuthForm;
