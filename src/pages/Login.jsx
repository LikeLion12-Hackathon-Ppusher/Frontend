import React from "react";
import styled from "styled-components";
import LoginBtnImg from "../kakao_login_medium_narrow.png";

const Login = () => {
  const REST_API_KEY = "ea433a9cc57e376f3ef82abbd8076b67";
  const REDIRECT_URI = "http://localhost:3000/oauth";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };
  return <LoginBtn src={LoginBtnImg} onClick={loginHandler}></LoginBtn>;
};

export default Login;

const LoginBtn = styled.img``;
