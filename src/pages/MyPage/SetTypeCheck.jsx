import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import backButtonImg from "../../assets/arrow-back.png";
import SetHeader from './SetHeader';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';

const SetTypeCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedType } = location.state || {};

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
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
  background-color: white;
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
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 5rem 0rem 2.5rem 0rem;
  margin-bottom: 6rem;
  text-align: center;
  width: 90%;

  p {
    font-size: 1.8rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-evenly;
  margin-left: 6rem;
  margin-right: 6rem;
`;

const Button = styled.button`
  width: 150px;
  height: 36px;
  margin-top: 0.5rem;
  border-radius: 0.4rem;
  color: #FFFFFF;
  background-color: #000000;
  font-size: 18px;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #000000;
    background-color: white;
  }
`;