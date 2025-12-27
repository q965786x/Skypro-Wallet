import React from "react";
import SignIn from "../components/SignIn/SignIn";

const SignInPage = ({ onLogin }) => {
  return <SignIn onLogin={onLogin} />;
};

export default SignInPage;