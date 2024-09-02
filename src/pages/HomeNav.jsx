import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import smokerReport from "../assets/제보흡연구역.png";
import nonSmokerReport from "../assets/상습흡연구역.png";
import { ThemeColorContext } from "../Context/context";

const HomeNav = () => {
  const mode = useContext(ThemeColorContext);

  const [isReportingMode, setIsReportingMode] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    // console.log(location);
    if (queryParams.get("report") === "true") {
      setIsReportingMode(true);
    } else {
      setIsReportingMode(false);
    }
    // console.log(isReportingMode);
  }, [location.search]);

  return (
    <Container>
      <AppBar>
        <LogoBox></LogoBox>
      </AppBar>
      <HomeContainer>
        <LogoContainer
          fontcolor={mode.font}
          bordercolor={mode.NavborderColor}
          backgroundcolor={mode.Navbackground}
        >
          {isReportingMode ? (
            <ReportModeBox>지도를 움직여 위치를 지정해주세요.</ReportModeBox>
          ) : (
            <>
              <ImgContainer>
                <img src={smokerReport} alt="흡연구역" />
                <div>제보 흡연구역</div>
              </ImgContainer>
              <ImgContainer>
                <img src={nonSmokerReport} alt="상습 흡연 제보구역" />
                <div>상습 흡연 제보구역</div>
              </ImgContainer>
            </>
          )}
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
  z-index: 500;
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
  text-align: center;
  img {
    width: 10%;
  }
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
  background-color: ${(props) => props.backgroundcolor};
  border: 2px solid;
  border-color: ${(props) => props.bordercolor};
  border-radius: 6px;
  color: ${(props) => props.fontcolor};
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

const ReportModeBox = styled.div``;
