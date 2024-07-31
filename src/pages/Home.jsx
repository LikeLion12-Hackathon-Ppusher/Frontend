import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeNav from "./HomeNav";
import { ThemeColorContext } from "../Context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import reportSvg from "../assets/제보.svg";

const Home = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);

  // Home에서 테마를 받아서 저장해야됨
  const context = useContext(ThemeColorContext);
  const [mode, setMode] = useState(context.smokeTheme);

  console.log(mode);
  console.log(mode);
  console.log(mode);

  useEffect(() => {
    setShowNav(true);
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
            btncolor={mode.background}
            fontcolor={mode.font}
            bordercolor={mode.borderColor}
            onClick={handleCurrentLocation}
          >
            현위치&nbsp;
            <FontAwesomeIcon icon={faRotateRight} size="lg" />
          </Btn>
          <Btn
            btncolor={mode.background}
            fontcolor={mode.font}
            bordercolor={mode.borderColor}
            onClick={handleReport}
          >
            제보&nbsp;
            <FontAwesomeIcon icon={faFileExport} size="lg" />
          </Btn>
          <Btn
            btncolor={mode.background}
            fontcolor={mode.font}
            bordercolor={mode.borderColor}
            onClick={handleMypage}
          >
            마이&nbsp;
            <FontAwesomeIcon icon={faUser} size="lg" />
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
  background-color: ${(props) => props.btncolor};
  color: ${(props) => props.fontcolor};
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  border: 2px solid;
  border-color: ${(props) => props.bordercolor};
`;
