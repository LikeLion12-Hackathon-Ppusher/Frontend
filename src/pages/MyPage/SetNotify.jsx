import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SetNotify = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home/mypage");
  };

  return (
    <AccountContainer>
      <h2>알림설정</h2>
      <div>
        <div>알림사용</div>
        <button>on</button>
        <button>off</button>
      </div>
      <BackBtn onClick={handleBack}>뒤로가기</BackBtn>
    </AccountContainer>
  );
};

export default SetNotify;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const BackBtn = styled.button`
`;