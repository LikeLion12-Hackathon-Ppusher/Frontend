import React from "react";
import HomeNav from "./HomeNav";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NaverMap from "./NaverMap";

const Home = () => {
  const navigate = useNavigate();

  const handleCurrentLocation = () => {
    navigate("/");
  };

  const handleReport = () => {
    navigate("/");
  };

  const handelMypage = () => {
    navigate("/");
  };

  return (
    <Container>
      <HomeNav></HomeNav>
      {/* 이 위치에 지도를 불러옵니다. */}
      <NaverMap></NaverMap>
      <BtnContainer>
        <Btn onClick={handleCurrentLocation}>현위치</Btn>
        <Btn onClick={handleReport}>제보하기</Btn>
        <Btn onClick={handelMypage}>마이페이지</Btn>
      </BtnContainer>
      <Nav>
        <NavItem></NavItem>
        <NavItem></NavItem>
        <NavItem></NavItem>
        <NavItem></NavItem>
      </Nav>
    </Container >
  );
};

export default Home;

const Container = styled.div`
  justify-content: center;
`;

const DiagnosisContainer = styled.div`
  margin-top: 1.8rem;
  background-color: #02d26b;
  height: 12rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Rigth = styled.div`
  width: 150px;
  height: 150px;
  background-color: wheat;
`;

const ExplanBox = styled.div`
  width: 15rem;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around
`;

const Btn = styled.div`
  padding: 0.5rem 1.5rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
  cursor: pointer;
`;

const Nav = styled.nav``;

const NavItem = styled.div``;
