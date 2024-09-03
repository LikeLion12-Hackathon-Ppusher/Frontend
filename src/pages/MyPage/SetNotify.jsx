import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SharedHeader from '../../components/SharedHeader';
import SetNotifySmoker from './SetNotifySmoker';
import SetNotifyNonSmoker from './SetNotifyNonSmoker';
import { Container } from '../../components/SharedContainer';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';

const SetNotify = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    setUserType(userType);
  }, []);

  return (
    <NotifyContainer>
      <SharedHeader headerText="알림 설정"></SharedHeader>
      {userType === 'SY' && <SetNotifySmoker />}
      {userType === 'SN' && <SetNotifyNonSmoker />}
    </NotifyContainer>
  );
};

export default SetNotify;

const NotifyContainer = styled(Container)`
  background-image: url(${detailBackgroundImage}); 
  background-color: #FFFFFF;
`