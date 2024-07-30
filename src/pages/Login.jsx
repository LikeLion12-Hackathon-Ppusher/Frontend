import React from "react";
import styled from "styled-components";
import LoginBtnImg from "../assets/kakao_login_medium_narrow.png";

const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI_LOCAL = process.env.REACT_APP_REDIRECT_URL_LOCAL;
  const REDIRECT_URI_PRODUCTION = process.env.REACT_APP_REDIRECT_URL_PRODUCTION;

  // 현재 URL이 localhost인 경우 로컬 리다이렉트 URI를 사용
  const REDIRECT_URI =
    window.location.hostname === "localhost"
      ? REDIRECT_URI_LOCAL
      : REDIRECT_URI_PRODUCTION;

  console.log("REST_API_KEY:", REST_API_KEY);
  console.log("REDIRECT_URI:", REDIRECT_URI);

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
