import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import SetHeader from './SetHeader';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';
import { getMyPageAPI } from '../../apis/api';

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

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <AccountContainer>
      <SetHeader headerText="카카오 계정 관리"></SetHeader>
      {userInfo && (
        <UserInfo>
          {/* <p>이메일: {userInfo.kakao_account.email}</p> */}
          <p>아이디: {userInfo.userId}</p>
          <p>유형: {userInfo.userType}</p>
          <p>카카오 이메일: {userInfo.kakaoEmail}</p>
          <p>이름: {userInfo.name}</p>
          <p>성별: {userInfo.gender}</p>
          <p>거리: {userInfo.distance}</p>
          <p>시간: {userInfo.time}</p>
          <p>알림설정: {userInfo.option}</p>
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
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const UserInfo = styled.div`
  margin-top: 20px;
  text-align: center;

  p {
    margin: 5px 0;
  }

  img {
    border-radius: 50%;
    margin-top: 10px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-top: 10px;
`;

const ThumbnailImage = styled.img`
  border-radius: 10%;
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-top: 10px;
`;