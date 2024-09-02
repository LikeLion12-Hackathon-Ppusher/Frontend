import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SetHeader from './SetHeader';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';
import dotsImg from '../../assets/background_dots.png';

const SetTypeConfirm = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/home/mypage");
  };

  return (
    <Container>
      <SetHeader headerText="사용자 유형 변경"></SetHeader>
      <Box>
        <DotsBox>
          <p>변경이 <strong>완료</strong>되었습니다.</p>
          <ButtonContainer>
            <Button onClick={handleConfirm}>확인</Button>
          </ButtonContainer>
        </DotsBox>
      </Box>
    </Container>
  );
};

export default SetTypeConfirm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${detailBackgroundImage}); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 700;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 90%;
  margin-bottom: 6rem;
  border-radius: 6px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #272A30;
  background-color: #fff100;

  p {
    font-size: 1.2rem;
  }
`;

const DotsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 96%;
  height: 95%;
  padding: 3.5rem 0rem 1.5rem 0rem;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat; 
  background-position: left top; 
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin-top: 0.4rem;
`;

const Button = styled.button`
  text-align: center;
  width: 45%;
  height: 2rem;
  margin-top: 1rem;
  border: 2px solid #272A30;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  color: #FFFFFF;
  background-color: #272A30;

  cursor: pointer;

  &:hover {
    color: #272A30;
    background-color: #FFFFFF;
  }
`;
