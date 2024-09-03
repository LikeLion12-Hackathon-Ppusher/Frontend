import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { putAlarmOptionAPI } from "../../apis/api";

const SetNotifyHeader = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(
    localStorage.getItem("option") === "true"
  );
  const token = localStorage.getItem("access_token");

  const handleNotificationToggle = (isOn) => {
    if (isOn) {
      setIsNotificationEnabled(true);
      putAlarmOptionAPI(token, true);
      localStorage.setItem("option", true);
      localStorage.setItem("suboption", true);
      alert("알림이 활성화되었습니다.");
    } else {
      setIsNotificationEnabled(false);
      putAlarmOptionAPI(token, false);
      localStorage.setItem("option", false);
      localStorage.setItem("suboption", false);
      alert("알림이 비활성화되었습니다.");
    }
  };

  // 컴포넌트 마운트 시 알림 권한 확인
  useEffect(() => {
    const option = localStorage.getItem("option");
    if (option === "true") {
      setIsNotificationEnabled(true);
    } else {
      setIsNotificationEnabled(false);
    }
  }, []);

  return (
    <NotifyHeaderContainer>
      <NotifyTitle>알림사용</NotifyTitle>
      <NotifyBtnContainer>
        <NotifyBtn
          isActive={isNotificationEnabled}
          onClick={() => handleNotificationToggle(true)}
        >
          ON
        </NotifyBtn>
        <NotifyBtn
          isActive={!isNotificationEnabled}
          onClick={() => handleNotificationToggle(false)}
        >
          OFF
        </NotifyBtn>
      </NotifyBtnContainer>
    </NotifyHeaderContainer>
  );
};

export default SetNotifyHeader;

const NotifyHeaderContainer = styled.div`
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

const NotifyTitle = styled.div`
  width: 40%;
  text-align: center;
  color: #272a30;
`;

const NotifyBtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
  height: 90%;
`;

const NotifyBtn = styled.button`
  width: 40%;
  height: 80%;
  border: 0.08rem;
  border-radius: 0.4rem;
  text-align: center;
  font-weight: bold;
  color: ${(props) => (props.isActive ? "#FFF100" : "#272A30")};
  background-color: ${(props) => (props.isActive ? "#272A30" : "#D9D9D9")};
  
  cursor: pointer;

  &:hover {
    color: #272a30;
    background-color: #fff100;
  }
`;
