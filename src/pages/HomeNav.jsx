import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImgPng from '../assets/logo.png';

const HomeNav = () => {
  const navigate = useNavigate();

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <Container>
      <AppBar>
        <div>시간</div>
        <div>샘플 로고</div>
        <div>배터리</div>
        {/* <LoginBtn onClick={loginHandler}>로그인</LoginBtn> */}
      </AppBar>
      <HomeContainer>
        <LogoContainer>
          <EmptyContainer></EmptyContainer>
          제보 흡연구역
          <EmptyContainer></EmptyContainer>
          상습 흡연 제보구역
          <EmptyContainer></EmptyContainer>
        </LogoContainer>
      </HomeContainer>
    </Container>
  );
};

export default HomeNav;

const Container = styled.div``;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 1.0rem;
  margin-right: 1.0rem;
  margin-bottom: 0.5rem;
`;

const AppBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 1.0rem;
  margin-right: 1.0rem;
`;

const LoginBtn = styled.div`
  cursor: pointer;
`;

const LogoContainer = styled.div`
  height: 2.5rem;
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: white;
  border: 1px solid;
  border-color: black;
  border-radius: 6px;
`;

const LogoImg = styled.img`
  object-fit: contain;
  margin-left: 20px;
  height: 100px;
  width: 100px;
`;

// 이걸로 space-between 사용해서 텍스틑 중앙정렬
const EmptyContainer = styled.div`
  width: 100px;
`;

const Navbar = styled.nav`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #02d26b;
  padding: 0.8rem 0;
`;

const NavItem = styled.nav`
  width: 100%;
  cursor: pointer;
`;
