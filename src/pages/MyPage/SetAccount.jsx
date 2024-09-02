import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SetHeader from './SetHeader';
import { getMyPageAPI } from '../../apis/api';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';
import dotsImg from '../../assets/background_dots.png';

const SetAccount = () => {
  // 프론트 단독 사용자 정보 호출 코드
  // const navigate = useNavigate();
  // const [accessToken, setAccessToken] = useState(null);
  // const handleUserInfo = async () => {
  //   const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`
  //     }
  //   }).then(response => {
  //     console.log(response.data);
  //     setUserInfo(response.data);
  //   })
  // };

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

  const handleType = (type) => {
    if (type === 'SY') {
      return '흡연자';
    } else {
      return '비흡연자';
    }
  };
  const handleAlarm = (option) => {
    if (option) {
      return '켜짐';
    } else {
      return '꺼짐';
    }
  };

  const handleDistance = (distance) => {
    if (distance === 2) {
      return 30;
    } else {
      return distance;
    };
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <AccountContainer>
      <SetHeader headerText="카카오 계정 관리"></SetHeader>
      {userInfo && (
        <UserInfo>
          {/* <p>이메일: {userInfo.kakao_account.email}</p> */}
          {/* <p>아이디: {userInfo.userId}</p> */}
          <DotsContainer>
            <InfoBox><Title>사용자 유형</Title><Content>{handleType(userInfo.userType)}</Content></InfoBox>
            <InfoBox><Title>카카오 이메일</Title><Content>{userInfo.kakaoEmail}</Content></InfoBox>
            <InfoBox><Title>이름</Title><Content>{userInfo.name}</Content></InfoBox>
            {userInfo.userType === "SN" && (<InfoBox><Title>설정거리</Title><Content>{handleDistance(userInfo.distance)}M</Content></InfoBox>)}
            <InfoBox><Title>알림설정 여부</Title><Content>{handleAlarm(userInfo.option)}</Content></InfoBox>
          </DotsContainer>
        </UserInfo>
      )}
      {/* <button onClick={handleUserInfo}>사용자 정보 불러오기</button> */}
    </AccountContainer>
  );
};

export default SetAccount;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${detailBackgroundImage}); 
  background-color: #FFFFFF;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 700;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;
  background-color: #FFF100;  
  text-align: center;
  width: 90%;
  height: 45%;
  border-radius: 1rem;
  box-shadow: 0.5rem 0.5rem 0.5rem #D9D9D9;
`;

const DotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat;  
  background-position: left top;  
  text-align: center;
  width: 95%;
  height: 95%;
`;

const InfoBox = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
  font-size: 1.2rem;
  font-weight: bold;
  color: #272A30;
  box-shadow: inset 0 -0.6rem 0 #E2D600;
  line-height: 1rem;
`;

const Content = styled.div`
  display: flex;
  padding: 0.6rem;
  width: 50%;
  min-width: relative;
  font-size: 1rem;
  color: #272A30;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: bold;
`;