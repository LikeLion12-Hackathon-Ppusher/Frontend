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
    navigate("/home/map?report=true");
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
  justify-content: space-between;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  position: absolute;
  bottom: 0;
  width: 90%;
  z-index: 1000;
`;

const Btn = styled.div`
  width: 120px;
  padding: 1rem 1rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: gray;
  cursor: pointer;
  text-align: center;
`;
