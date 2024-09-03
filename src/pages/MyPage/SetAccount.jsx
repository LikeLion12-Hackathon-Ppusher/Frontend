import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SharedHeader from '../../components/SharedHeader';
import { getMyPageAPI } from '../../apis/api';
import { handleType, handleAlarm, handleDistance } from '../../utils/utils';
import { Container } from '../../components/SharedContainer';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';
import dotsImg from '../../assets/background_dots.png';

const SetAccount = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getAccountInfo = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const userData = await getMyPageAPI(token);
      setUserInfo(userData);
    } catch (error) {
      alert('마이페이지 정보 가져오기 실패: ' + error);
    }
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <AccountContainer>
      <SharedHeader headerText="카카오 계정 관리"></SharedHeader>
      {userInfo && (
        <UserInfo>
          <DotsContainer>
            <InfoBox><Title>사용자 유형</Title><Content>{handleType(userInfo.userType)}</Content></InfoBox>
            <InfoBox><Title>카카오 이메일</Title><Content>{userInfo.kakaoEmail}</Content></InfoBox>
            <InfoBox><Title>이름</Title><Content>{userInfo.name}</Content></InfoBox>
            {userInfo.userType === "SN" && (<InfoBox><Title>설정거리</Title><Content>{handleDistance(userInfo.distance)}M</Content></InfoBox>)}
            <InfoBox><Title>알림설정 여부</Title><Content>{handleAlarm(userInfo.option)}</Content></InfoBox>
          </DotsContainer>
        </UserInfo>
      )}
    </AccountContainer>
  );
};

export default SetAccount;

const AccountContainer = styled(Container)`
  background-color: #FFFFFF;
  background-image: url(${detailBackgroundImage}); 
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90%;
  height: 45%;
  margin-bottom: 6rem;
  border-radius: 1rem;
  background-color: #FFF100;  
  box-shadow: 0.5rem 0.5rem 0.5rem #D9D9D9;
`;

const DotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 95%;
  height: 95%;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat;  
  background-position: left top;  
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
  line-height: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #272A30;
  box-shadow: inset 0 -0.6rem 0 #E2D600;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-width: relative;
  border-radius: 0.5rem;
  padding: 0.6rem;
  font-size: 1rem;
  font-weight: bold;
  color: #272A30;
  background-color: #FFFFFF;
`;