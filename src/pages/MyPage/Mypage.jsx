import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from '../../assets/mypage_background.png';
import { logOut } from "../../apis/api";

const Mypage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

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
      const kakaoAccessToken = localStorage.getItem('kakaoAccessToken');
      const response = await logOut(kakaoAccessToken);
      alert('로그아웃 성공:', response);
      console.log(response);
      navigate("/login");
    } catch (err) {
      alert('서버가 닫혀있습니다, 로컬에서 로그아웃됩니다.');
      console.log('로그아웃 에러:', err);
      localStorage.clear();
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
        <button onClick={handleLogout}>로그아웃</button>
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
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: 6rem;
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
  padding: 1.2rem 0rem;
  margin-top: 2rem;
  width: 100%;
  border-radius: 6px;
  background-color: #000000;
  font-size: 1.2rem;
  color: #FFF100;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #000000;
    background-color: #FFF100;
    transform: scale(1.01);
    outline: none; 
  }

  &.active {
    background-color: white;
    transform: scale(1.01);
  }
`;