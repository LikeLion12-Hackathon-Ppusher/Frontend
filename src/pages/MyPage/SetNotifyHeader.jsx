import React, { useState } from 'react';
import styled from "styled-components";

const SetNotifyHeader = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

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
    <TitleContainer>
      <Title>알림사용</Title>
      <TitleBtnContainer>
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
      </TitleBtnContainer>
    </TitleContainer>
  );
};

export default SetNotifyHeader;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: 4.5rem;
  border: 0.1rem solid black;
  border-radius: 0.4rem;
  font-size: 24px;
`;

const Title = styled.div`
  margin-left: 2rem;
`;

const TitleBtnContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  margin-left: 3rem;
  align-items: center;
`;

const TitleButton = styled.button`
  width: 48%;
  height: 60%;
  border-radius: 4px;
  color: ${(props) => (props.isActive ? "#FFF100" : "#000000")};
  background-color: ${(props) => (props.isActive ? "#000000" : "#D9D9D9")};
  font-size: 1.2rem;
  text-align: center;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    color: #000000;
    background-color: #FFF100;
  }
`;