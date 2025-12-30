import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Добавляем состояние проверки
  const hasRestoredSession = useRef(false); // Добавляем ref для отслеживания

  const login = useCallback((userData, userToken) => {
    console.log("🔐 AuthProvider.login() вызван:", {
      user: userData,
      tokenLength: userToken?.length
    });

    setUser(userData);
    setToken(userToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  }, []);

  const logout = useCallback(() => {
    console.log("🔐 AuthProvider.logout() вызван");
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  const updateUserInfo = useCallback((newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  }, []);

  useEffect(() => {
    if (hasRestoredSession.current) return;
    hasRestoredSession.current = true;

    console.log("🔐 Начинаю восстановление сессии...");

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    console.log("🔐 Найденные данные:", {
      storedUser: storedUser ? "есть" : "нет",
      storedToken: storedToken ? `есть (${storedToken.length} символов)` : "нет"
    });    

      if (
        storedUser &&
        storedToken &&
        storedToken !== "null" &&
        storedToken.trim() !== ""
      ) {
       try {
        console.log("🔐 Восстанавливаю сессию из localStorage");
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        console.log("🔐 Сессия восстановлена успешно");
        } catch (e) {
        console.error("❌ Ошибка при чтении данных пользователя:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        }
      } else {
        console.log("🔐 Нет валидного токена в localStorage");
      if (storedToken === "null" || storedToken?.trim() === "") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        }
      }
      setIsCheckingAuth(false);
   console.log("🔐 Проверка авторизации завершена");
  }, []);
    

  const value = useMemo(() => ({
    user,
    token,
    login,
    logout,
    updateUserInfo,
    isCheckingAuth,
  }), [user, token, login, logout, updateUserInfo, isCheckingAuth]);

  console.log("🔐 AuthProvider рендерится:", {
    user: user ? "есть" : "нет",
    token: token ? `есть (${token.length} символов)` : "нет",
    isCheckingAuth
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
