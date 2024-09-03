import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import smokerImg from "../assets/smoker.png";
import SmokerBackgroundImg from '../assets/smoker-background.png';

const SelectSmoker = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();

  const handleBoxClick = (box, time) => {
    setActiveBox(box);
    setSelectedTime(time);
  };

  const handleConfirmClick = () => {
    if (selectedTime !== null) {
      localStorage.setItem('time', selectedTime);
      navigate("/home/map", {
        state: { time: selectedTime, userType: "smoker" },
      });
      // window.location.reload();
    } else {
      alert("시간을 선택해 주세요.");
    }
  };

  return (
    <SelectContainer>
      <TitleContainer>
        <img src={smokerImg} alt="흡연자 이미지" />
        <h1>흡연자</h1>
      </TitleContainer>
      <Box>
        <h2>금연구역 알림 설정</h2>
        <div>
          금연구역에 <strong>얼마나 머문 경우</strong>부터
          <br /> 알림을 받으시겠습니까?
        </div>
        <BtnBox>
          <Btn
            className={activeBox === "immediate" ? "active" : ""}
            onClick={() => handleBoxClick("immediate", "즉시")}
          >
            즉시
          </Btn>
          <Btn
            className={activeBox === "5min" ? "active" : ""}
            onClick={() => handleBoxClick("5min", "5분")}
          >
            5분
          </Btn>
          <Btn
            className={activeBox === "10min" ? "active" : ""}
            onClick={() => handleBoxClick("10min", "10분")}
          >
            10분
          </Btn>
        </BtnBox>
      </Box>
      <SelectBtn onClick={handleConfirmClick}>확인</SelectBtn>
    </SelectContainer>
  );
};

export default SelectSmoker;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${SmokerBackgroundImg}); 
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  img {
    width: 10%;
  }
`;

const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: #f7f152;
  img {
    margin-right: 2rem;
  }
`;

const Box = styled.div`
  background-color: white;
  width: 90%;
  height: 15rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10% 0;

  h3 {
    margin-top: 1rem;
  }
`;

const BtnBox = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-evenly;
  width: 90%;
`;

const Btn = styled.div`
  padding: 1rem 1.5rem;
  background-color: black;
  border-radius: 0.4rem;
  cursor: pointer;
  color: white;
  border: 2px solid transparent;
  &:hover,
  &:focus {
    background-color: #f7f152;
    color: black;

    outline: none; /* 포커스 시에 기본 아웃라인을 없애기 위해 */
    border: 2px solid black;
  }

  &.active {
    background-color: #f7f152;
    color: black;
    border: 2px solid black;
  }
`;

const SelectBtn = styled.div`
  width: 90%;
  background-color: #f7f152;
  padding: 1rem 0;
  border-radius: 0.3rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
`;
