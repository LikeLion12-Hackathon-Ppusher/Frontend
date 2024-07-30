import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import smokeImg from "../assets/free-icon-smoking-813800.png";
import smokeImg2 from "../assets/상습흡연.png";
import { ThemeColorContext } from "../Context/context";

const HomeNav = () => {
  const mode = useContext(ThemeColorContext);
  return (
    <Container>
      <AppBar>
        <LogoBox>샘플 로고</LogoBox>
        {/* <LoginBtn onClick={loginHandler}>로그인</LoginBtn> */}
      </AppBar>
      <HomeContainer>
        <LogoContainer
          fontColor={mode.font}
          borderColor={mode.NavborderColor}
          backgroundColor={mode.background}
        >
          <ImgContainer>
            <img src={smokeImg} alt="" />
            <div>제보 흡연구역</div>
          </ImgContainer>{" "}
          <ImgContainer>
            <img src={smokeImg2} alt="" />
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
  background-color: ${(props) => props.backgroundColor};
  border: 2px solid;
  border-color: ${(props) => props.borderColor};
  border-radius: 6px;
  color: ${(props) => props.fontColor};
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;
