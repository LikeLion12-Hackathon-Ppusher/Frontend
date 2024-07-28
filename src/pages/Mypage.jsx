import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Mypage = () => {
  const navigate = useNavigate();
  const handleSample = () => {
    navigate("/");
  };

  return (
    <Container>
      <BtnContainer>
        마이페이지
        <Btn onClick={handleSample}>카카오 계정 관리</Btn>
        <Btn onClick={handleSample}>사용자 유형 변경</Btn>
        <Btn onClick={handleSample}>알림 설정</Btn>
        <Btn onClick={handleSample}>내 제보 내역</Btn>
      </BtnContainer>
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const Btn = styled.button`
  padding: 1rem 0rem 1rem 0rem;
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid black;
  background-color: white;
`;
