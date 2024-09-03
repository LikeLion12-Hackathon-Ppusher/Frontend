import React from "react";
import styled from "styled-components";
import { Container } from '../styles/SharedContainer';
import LoginBtnImg from "../assets/kakao_login_medium_narrow.png";
import InitialBckgrnd from "../assets/initial_background.png";
import Logo from "../assets/logo.png";

const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI_LOCAL = process.env.REACT_APP_REDIRECT_URL_LOCAL;
  const REDIRECT_URI_PRODUCTION = process.env.REACT_APP_REDIRECT_URL_PRODUCTION;
  console.log(REDIRECT_URI_PRODUCTION);
  // 현재 URL이 localhost인 경우 로컬 리다이렉트 URI를 사용
  const REDIRECT_URI =
    window.location.hostname === "localhost"
      ? REDIRECT_URI_LOCAL
      : REDIRECT_URI_PRODUCTION;
  console.log("REDIRECT_URI:", REDIRECT_URI);
  console.log("REST_API_KEY:", REST_API_KEY);
  console.log("REDIRECT_URI:", REDIRECT_URI);
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <LoginBox>
      <Box>
        <Title>
          <p>
            <span>흡연</span>자와 <span>비흡연</span>자,{" "}
            <strong>서로를 위하는</strong> 담배문화
          </p>
        </Title>
        <LogoImg src={Logo}></LogoImg>
        <LoginBtn src={LoginBtnImg} onClick={loginHandler}></LoginBtn>
      </Box>
    </LoginBox>
  );
};
export default Login;

const LoginBox = styled(Container)`
  background-image: url(${InitialBckgrnd});
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  max-height: 20vh;
  margin-top: 15%;
  font-size: 3vw;
  color: #535353;

  @media (min-width: 600px) {
    margin-bottom: 1rem;
    font-size: 1.2rem; /* 800px 이상일 때 고정 폰트 크기 */
  }

  p span {
    text-emphasis-style: dot;
  }
`;

const LogoImg = styled.img`
  display: flex;
  width: 60%;
  padding-right: 10%;
`;

const LoginBtn = styled.img`
  width: 50%;
  margin-top: 30%;
`;
