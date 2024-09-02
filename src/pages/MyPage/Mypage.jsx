import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import logOut from "../../apis/api";
import backgroundImage from '../../assets/mypage_background.png';

const Mypage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');

  const handleAccount = () => {
    navigate("/home/account")
  };

  const handleUserType = () => {
    navigate("/home/type");
  };

  const handleNotify = () => {
    navigate("/home/notify");
  };

  const handleReport = () => {
    navigate("/home/report");
  };

  const handleLogout = async () => {
    try {
      const response = await logOut(accessToken); // call logOut API with access token
      if (response) {
        const msg = response.data.message;
        alert('로그아웃 되었습니다.');
        localStorage.clear();
        navigate("/login");
      } else {
        throw new Error('응답 메세지가 없습니다.');
      }
    } catch (err) {
      alert('API 호출 실패. 로컬에서 로그아웃됩니다.');
      navigate("/home/mypage");
    }
  };

  return (
    <MyPageContainer>
      <MyPageHeader>마이페이지</MyPageHeader>
      <MyPageBtnContainer>
        <Btn onClick={handleAccount}>카카오 계정 관리</Btn>
        <Btn onClick={handleUserType}>사용자 유형 변경</Btn>
        <Outlet />
        <Btn onClick={handleNotify}>알림 설정</Btn>
        <Btn onClick={handleReport}>내 제보 내역</Btn>
        <Btn onClick={handleLogout}>로그아웃</Btn>
      </MyPageBtnContainer>
    </MyPageContainer>
  );
};

export default Mypage;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImage}); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: 6rem;
  z-index: 700;
`;

const MyPageHeader = styled.div`
  align-self: flex-start; 
  text-align: left;
  background: linear-gradient(to top, #FFF100 40%, transparent 40%);
  font-size: 1.6rem;
  font-weight: bold;
  margin-left: 5%;
`;

const MyPageBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const Btn = styled.button`
  border: 2px solid #272A30;
  padding: 1rem 0;
  margin-top: 3vh;
  font-size: 1rem;
  width: 100%;
  border-radius: 0.3rem;
  font-weight: bold;
  background-color: #272A30;
  color: #FFF100;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0.2rem 0.2rem 0.2rem;

  cursor: pointer;

  &:hover,
  &:focus {
    color: #272A30;
    background-color: #FFF100;
    transform: scale(1.005);
    outline: none; 
  }

  &.active {
    background-color: white;
    transform: scale(1.005);
  }
`;