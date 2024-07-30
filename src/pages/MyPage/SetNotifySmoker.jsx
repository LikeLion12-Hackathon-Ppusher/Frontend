import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SetNotifyHeader from "./SetNotifyHeader";

const SetNotifySmoker = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();

  const handleBoxClick = (box, time) => {
    setActiveBox(box);
    setSelectedTime(time);
  };

  const handleConfirmClick = () => {
    if (selectedTime !== null) {
      navigate("/home/mypage", { state: { time: selectedTime } });
    } else {
      alert("시간을 선택해 주세요.");
    }
  };

  return (
    <SelectContainer>
      <SetNotifyHeader></SetNotifyHeader>
      <Box>
        <h2>금연구역 알림 설정</h2>
        <Guide>
          금연구역에서 알림을 통해
          <br />
          <strong>가까운 흡연구역 정보</strong>를 확인할 수 있습니다.
        </Guide>
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

export default SetNotifySmoker;

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
  height: 18rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 6% 0;

  h3 {
    margin-top: 1rem;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin-top: 5%;
`;

const Btn = styled.div`
  padding: 1rem 1.5rem;
  color: white;
  background-color: black;
  border: 2px solid transparent;
  border-radius: 0.8rem;
  font-size: 1.5rem;
  cursor: pointer;
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
  height: 2rem;
  color: white;
  background-color: black;
  margin-top: 4rem;
  padding: 1.8rem 0rem 1.8rem 0rem;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  font-size: 1.6rem;
  &:hover,
  &:focus {
    color: black;
    background-color: #FFF100;
    outline: none;
  }
`;

const Guide = styled.div`
  font-size: 1.2rem;
`;
