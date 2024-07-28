import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const Mypage = () => {
  const navigate = useNavigate();
  const handleSample = () => {
    navigate("/");
  };

  const handleAccount = () => {
    navigate("/home/account")
  };

  const handleUserType = () => {
    navigate("/select");
  };

  const handleNotify = () => {
    navigate("/home/notify");
  };

  const handleReport = () => {
    navigate("/home/report");
  };

  return (
    <MyPageContainer>
      <MyPageBtnContainer>
        <MyPageHeader>마이페이지</MyPageHeader>
        <Btn onClick={handleAccount}>카카오 계정 관리</Btn>
        <Btn onClick={handleUserType}>사용자 유형 변경</Btn>
        <Outlet />
        <Btn onClick={handleNotify}>알림 설정</Btn>
        <Btn onClick={handleReport}>내 제보 내역</Btn>
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
  background-color: white;
  padding-bottom: 6rem;
`;

const MyPageHeader = styled.h1`
  display: flex;
  justify-content: start;
  position: absolute;
  top: 6rem;
  left: 2rem;
`;

const MyPageBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const Btn = styled.button`
  padding: 1.2rem 0rem 1.2rem 0rem;
  margin-top: 1.5rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid black;
  background-color: white;
  font-size: 18px;
`;
