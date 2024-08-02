import React, { useState } from 'react';
import styled from "styled-components";
import { putAlarmOptionAPI } from '../../apis/api';

const SetNotifyHeader = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const token = localStorage.getItem('access_token');

  const handleNotificationToggle = (isOn) => {
    // 알림 활성화 요청
    if (isOn) {
      if (Notification.permission === "granted") {
        setIsNotificationEnabled(true);
        alert("알림이 활성화되었습니다.");
        putAlarmOptionAPI(token, true);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setIsNotificationEnabled(true);
            alert("알림이 활성화되었습니다.");
            putAlarmOptionAPI(token, true);
          } else {
            alert("알림 권한이 거부되었습니다.");
          }
        });
      }
    } else {
      setIsNotificationEnabled(false);
      alert("알림이 비활성화되었습니다.");
      putAlarmOptionAPI(token, false);
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
  height: 3rem;
  border: 0.08rem solid black;
  border-radius: 0.4rem;
  font-size: 1.2rem;
`;

const Title = styled.div`
  margin-left: 2rem;
`;

const TitleBtnContainer = styled.div`
  width: 60%;
  height: 90%;
  display: flex;
  justify-content: space-around;
  margin-left: 3rem;
  align-items: center;
`;

const TitleButton = styled.button`
  width: 45%;
  height: 80%;
  color: ${(props) => (props.isActive ? "#FFF100" : "#000000")};
  background-color: ${(props) => (props.isActive ? "#000000" : "#D9D9D9")};
  font-size: 1rem;
  text-align: center;
  border: 0.08rem;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    color: #000000;
    background-color: #FFF100;
  }
`;
