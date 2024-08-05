import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeNav from "./HomeNav";
import { ThemeColorContext } from "../Context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);

  // Home에서 테마를 받아서 저장해야됨
  const context = useContext(ThemeColorContext);
  const [mode, setMode] = useState(context.nonSmokeTheme);

  // 버튼 눌렀을때 active여부 상태 저장
  const [activeButton, setActiveButton] = useState("");

  const location = useLocation();
  const { state } = location;

  // console.log(mode);

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    if (userType === "SY") {
      setMode(context.smokeTheme); // 흡연자 테마로 설정
    } else {
      setMode(context.nonSmokeTheme); // 비흡연자 테마로 설정
    }

    // navigate("/home/map");
  }, [state, context]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("report") === "true") {
      setActiveButton("report");
    } else {
      setActiveButton("");
    }
    setShowNav(true); // 새로고침해도 HomeNav 안 보임
  }, [location.search]);

  const handleCurrentLocation = () => {
    setActiveButton("");
    setShowNav(true);
    // navigate("/home/map");
    navigate("/home/map?currentLocation=true");
  };

  const handleReport = () => {
    setShowNav(true); // 기본적으로 네비게이션을 표시
    setActiveButton("report");
    setShowNav(true);
    navigate("/home/map?report=true");
  };

  const handleMypage = () => {
    setActiveButton("mypage");
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
            btnactiveback={mode.btnActiveback}
            btnactivefont={mode.btnActivefont}
            btnactiveborder={mode.btnActiveborder}
            onClick={handleCurrentLocation}
            isActive={activeButton === "currentLocation"}
          >
            현위치&nbsp;
            <FontAwesomeIcon icon={faRotateRight} size="lg" />
          </Btn>
          <Btn
            btncolor={mode.background}
            fontcolor={mode.font}
            bordercolor={mode.borderColor}
            btnactiveback={mode.btnActiveback}
            btnactivefont={mode.btnActivefont}
            btnactiveborder={mode.btnActiveborder}
            onClick={handleReport}
            isActive={activeButton === "report"}
          >
            제보&nbsp;
            <FontAwesomeIcon icon={faFileExport} size="lg" />
          </Btn>
          <Btn
            btncolor={mode.background}
            fontcolor={mode.font}
            bordercolor={mode.borderColor}
            btnactiveback={mode.btnActiveback}
            btnactivefont={mode.btnActivefont}
            btnactiveborder={mode.btnActiveborder}
            onClick={handleMypage}
            isActive={activeButton === "mypage"}
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
  background-color: ${(props) =>
    props.isActive ? props.btnactiveback : props.btncolor};
  color: ${(props) => (props.isActive ? props.btnactivefont : props.fontcolor)};
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  border: 2px solid;
  border-color: ${(props) => props.bordercolor};
  &:hover {
    color: ${(props) => props.btnactivefont};
    background-color: ${(props) => props.btnactiveback};
    border-color: ${(props) => props.bordercolor};
  }
`;
