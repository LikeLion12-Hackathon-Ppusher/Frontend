import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SetAccount = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/home/mypage");
    };

    return (
        <AccountContainer>
            제보 내역 탭
            <BackBtn onClick={handleBack}>뒤로가기</BackBtn>
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

const BackBtn = styled.button`
`;