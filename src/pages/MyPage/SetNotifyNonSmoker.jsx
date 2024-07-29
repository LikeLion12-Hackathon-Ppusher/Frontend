import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SetNotifyNonSmoker = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

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

  const handleNotificationToggle = (isOn) => {
    if (isOn) {
      // 알림 권한 요청
      if (Notification.permission === "granted") {
        setIsNotificationEnabled(true);
        alert("알림이 활성화되었습니다.");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setIsNotificationEnabled(true);
            alert("알림이 활성화되었습니다.");
          } else {
            alert("알림 권한이 거부되었습니다.");
          }
        });
      }
    } else {
      setIsNotificationEnabled(false);
      alert("알림이 비활성화되었습니다.");
    }
  };

  return (
    <SelectContainer>
      <TitleContainer>
        <p>알림 사용</p>
        <TitleButton
          isActive={isNotificationEnabled}
          onClick={() => handleNotificationToggle(true)}
        >
          ON
        </TitleButton>
        <TitleButton
          isActive={!isNotificationEnabled}
          onClick={() => handleNotificationToggle(false)}
        >
          OFF
        </TitleButton>
      </TitleContainer>
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
  background-color: white;

  img {
    width: 10%;
  }
`;

const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;

  img {
    margin-right: 2rem;
  }
`;

const TitleButton = styled.button`
  width: 150px;
  height: 36px;
  border-radius: 4px;
  background-color: ${(props) => (props.isActive ? "#ddd" : "white")};
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #ddd;

  &:hover {
    background-color: #FFF100;
  }
`;

const Box = styled.div`
  background-color: #dedddd;
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

  &:hover,
  &:focus {
    background-color: #c0c0c0;
    transform: scale(1.05);
    outline: none;
  }

  &.active {
    background-color: gray;
    transform: scale(1.05);
  }
`;

const SelectBtn = styled.div`
  width: 90%;
  background-color: gray;
  padding: 1rem 0;
  border-radius: 0.4rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
`;
