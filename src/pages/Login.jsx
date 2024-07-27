import React from "react";
import styled from "styled-components";
import LoginBtnImg from "../kakao_login_medium_narrow.png";

const Login = () => {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };
  return <LoginBtn src={LoginBtnImg} onClick={loginHandler}></LoginBtn>;
};

export default Login;

const LoginBtn = styled.img``;
