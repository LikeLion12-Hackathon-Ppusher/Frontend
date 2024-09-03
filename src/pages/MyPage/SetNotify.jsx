import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SetHeader from './SetHeader';
import SetNotifySmoker from './SetNotifySmoker';
import SetNotifyNonSmoker from './SetNotifyNonSmoker';
import { Container } from '../../theme/SharedContainer';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';

const SetNotify = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    setUserType(userType);
  }, []);

  return (
    <NotifyContainer>
      <SetHeader headerText="알림 설정"></SetHeader>
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