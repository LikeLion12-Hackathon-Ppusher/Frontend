import React from "react";
import styled from "styled-components";
import LoginBtnImg from "../assets/kakao_login_medium_narrow.png";

const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=https://wellnesstour.netlify.app/oauth&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <LoginBox>
      <LoginBtn src={LoginBtnImg} onClick={loginHandler}></LoginBtn>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.div`
  background-color: gray;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.img``;
