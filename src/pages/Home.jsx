import React from "react";
import HomeNav from "./HomeNav";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleDiagnosis = () => {
    navigate("/diagnosis");
  };

  return (
    <>
      <HomeNav></HomeNav>
      <DiagnosisContainer>
        <Left>
          <ExplanBox>
            바쁜 현대 사회에서 번아웃을 느끼는 당신, 우울증과 불안감을 안고 살아
            가는 당신, 웰니스 여행지 처방 받고 웰니스 여행 떠나보세요~
          </ExplanBox>
          <DiagnosisBtn onClick={handleDiagnosis}>버튼</DiagnosisBtn>
        </Left>
        <Rigth>사진</Rigth>
      </DiagnosisContainer>
      <Nav>
        <NavItem></NavItem>
        <NavItem></NavItem>
        <NavItem></NavItem>
        <NavItem></NavItem>
      </Nav>
    </>
  );
};

export default Home;

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

const DiagnosisBtn = styled.div`
  padding: 0.5rem 1.5rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: gray;
  cursor: pointer;
`;

const Nav = styled.nav``;

const NavItem = styled.div``;
