import React from "react";
import AuthForm from "./AuthForm/AuthForm";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  return <AuthForm isSignUp={true} />;
};

export default SignUp;
