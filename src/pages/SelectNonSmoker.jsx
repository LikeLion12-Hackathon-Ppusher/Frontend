import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import nonSmokerImg from "../assets/nonSmoker.png";

const SelectNonSmoker = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);

  const navigate = useNavigate();

  const handleBoxClick = (box, distance) => {
    setActiveBox(box);
    setSelectedDistance(distance);
  };

  const handleConfirmClick = () => {
    if (selectedDistance) {
      // 비흡연자 설정 페이지로 이동 (경로는 예시로 작성했습니다. 필요에 맞게 수정하세요.)
      navigate("/home/map", {
        state: { distance: selectedDistance, userType: "nonSmoker" },
      });
      // window.location.reload();
    } else {
      alert("거리를 선택해 주세요.");
    }
  };
  return (
    <SelectContainer>
      <TitleContainer>
        <img src={nonSmokerImg} alt="흡연자 이미지" />
        <h1>비흡연자</h1>
      </TitleContainer>
      <Box>
        <h2>간접흡연 위험구역 알림 설정</h2>
        <div>
          흡연구역에서 <strong>얼마나 떨어진 거리</strong>부터
          <br></br> 알림을 받으시겠습니까?
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

export default SelectNonSmoker;

const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;

  img {
    width: 10%;
  }

  h1 {
    background: linear-gradient(to top, #fff100 40%, transparent 40%);
  }
`;

const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: center;

  img {
    margin-right: 2rem;
  }
`;

const Box = styled.div`
  background-color: #f7f152;
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
  background-color: white;
  border-radius: 0.4rem;
  cursor: pointer;
  color: black;
  border: 2px solid black;
  &:hover,
  &:focus {
    background-color: black;
    color: white;
    outline: none; /* 포커스 시에 기본 아웃라인을 없애기 위해 */
    border: 2px solid black;
  }

  &.active {
    background-color: black;
    color: white;
    border: 2px solid black;
  }
`;

const SelectBtn = styled.div`
  width: 90%;
  background-color: black;
  color: white;
  padding: 1rem 0;
  border-radius: 0.3rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
`;
