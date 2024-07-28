import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeNav from "./HomeNav";

const Home = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);

  const handleCurrentLocation = () => {
    setShowNav(true);
    navigate("/home/map");
  };

  const handleReport = () => {
    setShowNav(true);
    navigate("/");
  };

  const handleMypage = () => {
    setShowNav(false);
    navigate("/home/mypage");
  };

  return (
    <Container>
      {showNav && <HomeNav />}
      <Outlet />
      <BtnContainer>
        <Btn onClick={handleCurrentLocation}>현위치</Btn>
        <Btn onClick={handleReport}>제보하기</Btn>
        <Btn onClick={handleMypage}>마이페이지</Btn>
      </BtnContainer>
      <Nav>
        <NavItem></NavItem>
        <NavItem></NavItem>
        <NavItem></NavItem>
        <NavItem></NavItem>
      </Nav>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0.5rem 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
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
