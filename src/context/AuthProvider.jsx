import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const hasRestoredSession = useRef(false);

  const login = useCallback((userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  }, []);

  const logout = useCallback(() => {
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

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (
      storedUser &&
      storedToken &&
      storedToken !== "null" &&
      storedToken.trim() !== ""
    ) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (e) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      if (storedToken === "null" || storedToken?.trim() === "") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setIsCheckingAuth(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      updateUserInfo,
      isCheckingAuth,
    }),
    [user, token, login, logout, updateUserInfo, isCheckingAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
