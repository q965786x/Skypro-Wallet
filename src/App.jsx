import React, { useEffect } from "react";
import AuthProvider from "./context/AuthProvider";
import TransactionProvider from "./context/TransactionProvider";
import AppRoutes from "./components/AppRoutes";
import "./App.css";

function App() {
  useEffect(() => {
    // Добавляем класс для мобильных устройств
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        document.body.classList.add('is-mobile');
      } else {
        document.body.classList.remove('is-mobile');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  
  return (
    <AuthProvider>
      <TransactionProvider>
        <div className="app">
          <AppRoutes />
        </div>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
