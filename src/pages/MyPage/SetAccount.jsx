import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import backButtonImg from "../../assets/arrow-back.png";
import SetHeader from './SetHeader';

const SetAccount = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('kakaoAccessToken');
    setAccessToken(token);
  }, []);

  const handleUserInfo = async () => {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(response => {
      console.log(response.data);
      setUserInfo(response.data);
    })
  };

  return (
    <AccountContainer>
      <SetHeader headerText="카카오 계정 관리"></SetHeader>
      {userInfo && (
        <UserInfo>
          <p>이름: {userInfo.kakao_account.profile.nickname}</p>
          <p>이메일: {userInfo.kakao_account.email}</p>
          <ProfileImage src={userInfo.kakao_account.profile.profile_image_url} alt="Profile" />
          {/* <ThumbnailImage src={userInfo.kakao_account.profile.thumbnail_image_url} alt="Thumbnail" /> */}
        </UserInfo>
      )}
      <button onClick={handleUserInfo}>사용자 정보 불러오기</button>
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
  background-color: white;
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