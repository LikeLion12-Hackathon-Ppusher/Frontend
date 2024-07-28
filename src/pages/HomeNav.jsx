import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import smokeImg from "../assets/free-icon-smoking-813800.png";

const HomeNav = () => {
  const navigate = useNavigate();

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <Container>
      <AppBar>
        <LogoBox>샘플 로고</LogoBox>
        {/* <LoginBtn onClick={loginHandler}>로그인</LoginBtn> */}
      </AppBar>
      <HomeContainer>
        <LogoContainer>
          <ImgContainer>
            <img src={smokeImg} alt="" />
            <div>제보 흡연구역</div>
          </ImgContainer>{" "}
          <ImgContainer>
            <div>상습 흡연 제보구역</div>{" "}
          </ImgContainer>
        </LogoContainer>
      </HomeContainer>
    </Container>
  );
};

export default HomeNav;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const AppBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;
  margin-left: 1rem;
  margin-right: 1rem;
  width: 100%;
`;

const LogoBox = styled.div`
  background-color: gray;
`;

const HomeContainer = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 20px;
  width: 90%;
`;

const LogoContainer = styled.div`
  height: 2.5rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: white;
  border: 1px solid;
  border-color: black;
  border-radius: 6px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;
