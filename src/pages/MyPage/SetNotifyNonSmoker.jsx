import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SetNotifyHeader from "./SetNotifyHeader";

const SetNotifyNonSmoker = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);

  const navigate = useNavigate();

  const handleBoxClick = (box, distance) => {
    setActiveBox(box);
    setSelectedDistance(distance);
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
        <h2>간접흡연 위험구역 알림 설정</h2>
        <div>
          흡연구역에서 <strong>얼마나 떨어진 거리</strong>부터
          <br /> 알림을 받으시겠습니까?
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
        </BtnBox>
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
  margin-top: 1rem;
  display: flex;
  justify-content: space-evenly;
  width: 90%;
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