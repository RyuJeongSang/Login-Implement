import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./login-form";
import { LoginedPage } from "./logined-page";

const LoginContainer = styled.main`
  background-color: wheat;
  width: 100%;
  height: 100vh;
`;

export const Loginpage = () => {
  const [isLogin, setIsLogin] = useState(false);

  // User Login info(하드코딩 just make test easy!!)

  return (
    <LoginContainer>
      {isLogin ? <LoginedPage /> : <LoginForm setIsLogin={setIsLogin} />}
    </LoginContainer>
  );
};
