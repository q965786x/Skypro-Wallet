import React from "react";
import AuthProvider from "./context/AuthProvider";
import TransactionProvider from "./context/TransactionProvider";
import AppRoutes from "./components/AppRoutes";
import "./App.css";

function App() {
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
