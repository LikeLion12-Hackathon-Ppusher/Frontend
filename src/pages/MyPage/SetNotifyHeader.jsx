import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { putAlarmOptionAPI } from "../../apis/api";

const SetNotifyHeader = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(
    localStorage.getItem("option") === "true"
  );
  const token = localStorage.getItem("access_token");

  // 컴포넌트 마운트 시 알림 권한 확인
  useEffect(() => {
    const option = localStorage.getItem("option");
    if (option === "true") {
      setIsNotificationEnabled(true);
    } else {
      setIsNotificationEnabled(false);
    }
  }, []);

  const handleNotificationToggle = (isOn) => {
    // 알림 활성화 요청
    // if (isOn) {
    //   if (Notification.permission === "granted") {
    //     setIsNotificationEnabled(true);
    //     localStorage.setItem('option', true);
    //     alert("알림이 활성화되었습니다.");
    //     putAlarmOptionAPI(token, true);
    //   } else if (Notification.permission !== "denied") {
    //     Notification.requestPermission().then((permission) => {
    //       if (permission === "granted") {
    //         setIsNotificationEnabled(true);
    //         localStorage.setItem('option', true);
    //         alert("알림이 활성화되었습니다.");
    //         putAlarmOptionAPI(token, true);
    //       } else {
    //         localStorage.setItem('option', true);
    //         alert("알림 권한이 거부되었습니다.");
    //       }
    //     });
    //   }
    // } else {
    //   setIsNotificationEnabled(false);
    //   alert("알림이 비활성화되었습니다.");
    //   localStorage.setItem('option', false);
    //   putAlarmOptionAPI(token, false);
    // }
    if (isOn) {
      setIsNotificationEnabled(true);
      localStorage.setItem("option", true);
      localStorage.setItem("suboption", true);
      alert("알림이 활성화되었습니다.");
      putAlarmOptionAPI(token, true);
    } else {
      setIsNotificationEnabled(false);
      alert("알림이 비활성화되었습니다.");
      localStorage.setItem("option", false);
      localStorage.setItem("suboption", false);
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
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 3rem;
  border: 2px solid #272a30;
  border-radius: 0.3rem;
  font-weight: bold;
  background-color: #fffeee;
  box-shadow: 0.2rem 0.2rem 0.2rem #fefbbd;
`;

const Title = styled.div`
  width: 40%;
  text-align: center;
  color: #272a30;
`;

const TitleBtnContainer = styled.div`
  width: 60%;
  height: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const TitleButton = styled.button`
  width: 40%;
  height: 80%;
  color: ${(props) => (props.isActive ? "#FFF100" : "#272A30")};
  background-color: ${(props) => (props.isActive ? "#272A30" : "#D9D9D9")};
  font-weight: bold;
  text-align: center;
  border: 0.08rem;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    color: #272a30;
    background-color: #fff100;
  }
`;
