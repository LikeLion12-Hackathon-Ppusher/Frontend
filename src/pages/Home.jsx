import React from "react";
import HomeNav from "./HomeNav";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NaverMap from "./NaverMap";
import KakaoMap from "./KakaoMap";

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

  const handleMyMap = () => {
    navigate("/kakao");
  };

  return (
    <Container>
      <HomeNav></HomeNav>
      {/* 지도를 화면에 가득 채우자 */}
      <MapContainer>
        <KakaoMap></KakaoMap>
      </MapContainer>
      <BtnContainer>
        <Btn onClick={handleCurrentLocation}>현위치</Btn>
        <Btn onClick={handleReport}>제보하기</Btn>
        <Btn onClick={handelMypage}>마이페이지</Btn>
        <Btn onClick={handleMyMap}>카카오 지도보기</Btn>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5rem;
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
