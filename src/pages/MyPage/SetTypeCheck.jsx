import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SetHeader from './SetHeader';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';
import { putUserTypeAPI } from '../../apis/api';

const SetTypeCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { selectedType } = location.state || {};

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    const token = localStorage.getItem('access_token');
    if (selectedType === 'smoker') {
      selectedType = "SY";
    } else {
      selectedType = "SN";
    }
    alert(`타입 상태: ${selectedType}`);
    const status = putUserTypeAPI(token, selectedType);
    console.log('PUT 응답 상태:', status);
    localStorage.setItem('userType', selectedType);
    navigate("/home/set-type-confirm");
  };

  return (
    <Container>
      <SetHeader headerText={"사용자 유형 변경"}></SetHeader>
      <Box>
        <p>정말 <strong>변경</strong>하시겠습니까?</p>
        <ButtonContainer>
          <Button onClick={handleCancel}>취소</Button>
          <Button onClick={handleConfirm}>확인</Button>
        </ButtonContainer>
      </Box>
    </Container>
  );
};

export default SetTypeCheck;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${detailBackgroundImage}); 
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Box = styled.div`
  background-color: #FFF100;
  border-radius: 6px;
  padding: 4rem 0rem 2rem 0rem;
  margin-bottom: 6rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;

  p {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-around;
  width: 60%;
`;

const Button = styled.button`
  width: 45%;
  height: 2rem;
  margin-top: 1rem;
  border: 1px solid black;
  border-radius: 0.4rem;
  color: #FFFFFF;
  background-color: #000000;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #000000;
    background-color: white;
  }
`;