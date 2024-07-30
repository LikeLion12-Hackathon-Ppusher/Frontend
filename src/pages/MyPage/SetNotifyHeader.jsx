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
  );
};

export default SetNotifyHeader;

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