import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backButtonImg from "../../assets/arrow-back.png";
import SetNotifySmoker from './SetNotifySmoker';
import SetNotifyNonSmoker from './SetNotifyNonSmoker';

const SetNotify = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // (임시) 로컬스토리지에서 사용자 유형 정보를 가져옵니다.
    const userType = localStorage.getItem('userType');
    setUserType(userType);
  }, []);

  return (
    <AccountContainer>
      <BackButton onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="뒤로가기" />
      </BackButton>
      {userType === 'smoker' && <SetNotifySmoker />}
      {userType === 'nonSmoker' && <SetNotifyNonSmoker />}
      <TypeHeader>알림설정</TypeHeader>
    </AccountContainer>
  );
};

export default SetNotify;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 6rem;
  left: 1rem;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const TypeHeader = styled.h1`
  width: 90%;
  font-size: 32px;
  position: absolute;
  top: 9rem;
`;