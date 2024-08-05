import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SetNotifyHeader from "./SetNotifyHeader";
import { putMyPageDistAPI } from "../../apis/api";
import dotsImg from '../../assets/background_dots.png';

const SetNotifyNonSmoker = () => {
  const navigate = useNavigate();
  const [activeBox, setActiveBox] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);

  useEffect(() => {
    const selectedDistance = localStorage.getItem('distance') + 'm';
    console.log(selectedDistance);
    if (selectedDistance) {
      setActiveBox(selectedDistance);
      setSelectedDistance(selectedDistance);
    }
  }, []);

  const handleBoxClick = (box, distance) => {
    const token = localStorage.getItem('access_token');

    setActiveBox(box);
    setSelectedDistance(distance);
    localStorage.setItem('distance', distance);
    putMyPageDistAPI(token, distance);
  };

  const handleConfirmClick = () => {
    if (selectedDistance) {
      navigate("/home/mypage", { state: { distance: selectedDistance } });
    } else {
      alert("거리를 선택해 주세요.");
    }
  };

  return (
    <SelectContainer>
      <SetNotifyHeader></SetNotifyHeader>
      <Box>
        <DotsBox>        <h3>간접흡연 위험구역 알림 설정</h3>
          <div>
            간접흡연 위험 지역에서
            <br /> 알림을 받을 수 있습니다.
          </div>
          <BtnBox>
            <Btn
              className={activeBox === "10m" ? "active" : ""}
              onClick={() => handleBoxClick("10m", 10)}
            >
              10M
            </Btn>
            <Btn
              className={activeBox === "20m" ? "active" : ""}
              onClick={() => handleBoxClick("20m", 20)}
            >
              20M
            </Btn>
            <Btn
              className={activeBox === "30m" ? "active" : ""}
              onClick={() => handleBoxClick("30m", 30)}
            >
              30M
            </Btn>
          </BtnBox></DotsBox>
      </Box>
      <SelectBtn onClick={handleConfirmClick}>확인</SelectBtn>
    </SelectContainer>
  );
};

export default SetNotifyNonSmoker;

const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 10%;
  }
`;

const Box = styled.div`
  background-color: #FFF100;
  width: 90%;
  height: 15rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5% 0 15% 0;

  h3 {
    font-size: 1.2rem;
  }
`;

const DotsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat; 
  background-position: left top; 
  text-align: center;
  width: 96%;
  height: 94%;
`;

const BtnBox = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-evenly;
  width: 90%;
`;

const Btn = styled.div`
  padding: 0.8rem 1.2rem;
  background-color: #272A30;
  border-radius: 0.4rem;
  cursor: pointer;
  color: white;
  border: 2px solid transparent;
  font-weight: bold;
  &:hover,
  &:focus {
    background-color: #f7f152;
    color: #272A30;

    outline: none; /* 포커스 시에 기본 아웃라인을 없애기 위해 */
    border: 2px solid #272A30;
  }

  &.active {
    background-color: #f7f152;
    color: #272A30;
    border: 2px solid #272A30;
  }
`;

const SelectBtn = styled.div`
  width: 90%;
  color: white;
  background-color: #272A30;
  padding: 1rem 0;
  border-radius: 0.3rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0.2rem 0.2rem 0.2rem #FEFBBD;
`;
