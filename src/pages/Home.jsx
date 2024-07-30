import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeNav from "./HomeNav";
import { ThemeColorContext } from "../Context/context";

const Home = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);

  // Home에서 테마를 받아서 저장해야됨
  const context = useContext(ThemeColorContext);
  const [mode, setMode] = useState(context.nonSmokeTheme);

  console.log(mode);

  useEffect(() => {
    setShowNav(true);
    handleCurrentLocation();
  }, []);

  useEffect(() => {
    navigate("/home/map");
  }, []);

  const handleCurrentLocation = () => {
    navigate("/home/map?currentLocation=true");
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
    <ThemeColorContext.Provider value={mode}>
      <Container>
        {showNav && <HomeNav />}
        <Outlet />
        <BtnContainer>
          <Btn
            btnColor={mode.background}
            fontColor={mode.font}
            borderColor={mode.borderColor}
            onClick={handleCurrentLocation}
          >
            현위치
          </Btn>
          <Btn
            btnColor={mode.background}
            fontColor={mode.font}
            borderColor={mode.borderColor}
            onClick={handleReport}
          >
            제보
          </Btn>
          <Btn
            btnColor={mode.background}
            fontColor={mode.font}
            borderColor={mode.borderColor}
            onClick={handleMypage}
          >
            마이
          </Btn>
        </BtnContainer>
      </Container>
    </ThemeColorContext.Provider>
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
  width: 20%;
  padding: 1rem 1rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.btnColor};
  color: ${(props) => props.fontColor};
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  border: 2px solid;
  border-color: ${(props) => props.borderColor};
`;
