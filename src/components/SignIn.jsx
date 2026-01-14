import React from "react";
import AuthForm from "./AuthForm/AuthForm";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  return <AuthForm isSignUp={false} />;
};

export default SignIn;
