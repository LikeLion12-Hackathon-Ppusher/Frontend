import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImgPng from "../logo.png";

const HomeNav = () => {
  const navigate = useNavigate();

  // 로그인 화면으로 이동
  const handleLogin = () => {
    navigate("/login");
  };

  // 처방화명으로 이동
  const handlePrescription = () => {
    navigate("/form");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleReview = () => {
    navigate("/review");
  };

  const handleStamp = () => {
    navigate("/stamp");
  };

  return (
    <Container>
      <LoginContainer>
        <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
      </LoginContainer>
      <HomeContainer>
        <LogoContainer>
          <LogoImg src={LogoImgPng} alt="LogoImg"></LogoImg>
          Well-Scription
          <EmptyContainer></EmptyContainer>
        </LogoContainer>
        <Navbar>
          <NavItem onClick={handlePrescription}>여행 처방전</NavItem>
          <NavItem onClick={handleSearch}>여행지 검색</NavItem>
          <NavItem onClick={handleHome}>홈</NavItem>
          <NavItem onClick={handleReview}>후기 작성</NavItem>
          <NavItem onClick={handleStamp}>스탬프 현황</NavItem>
        </Navbar>
      </HomeContainer>
    </Container>
  );
};

export default HomeNav;

const Container = styled.div`
  width: 80%;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const LoginBtn = styled.div`
  cursor: pointer;
`;

const LogoContainer = styled.div`
  height: 8.5rem;
  width: 100%;
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #02d26b;
`;

const LogoImg = styled.img`
  object-fit: contain;
  margin-left: 20px;
  heigth: 100px;
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
`;
