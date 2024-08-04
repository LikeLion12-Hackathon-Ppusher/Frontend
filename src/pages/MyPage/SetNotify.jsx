import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SetHeader from './SetHeader';
import SetNotifySmoker from './SetNotifySmoker';
import SetNotifyNonSmoker from './SetNotifyNonSmoker';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';

const SetNotify = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // (임시) 로컬스토리지에서 사용자 유형 정보를 가져옵니다.
    const userType = localStorage.getItem('userType');
    setUserType(userType);
  }, []);

  return (
    <AccountContainer>
      <SetHeader headerText="알림 설정"></SetHeader>
      {userType === 'SY' && <SetNotifySmoker />}
      {userType === 'SN' && <SetNotifyNonSmoker />}
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
  background-image: url(${detailBackgroundImage}); 
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 700;
`;