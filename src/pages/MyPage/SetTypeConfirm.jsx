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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${detailBackgroundImage}); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 700;
`;

const Box = styled.div`
  color: #272A30;
  background-color: #fff100;
  border-radius: 6px;
  margin-bottom: 6rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  p {
    font-size: 1.2rem;
  }
`;

const DotsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.5rem 0rem 1.5rem 0rem;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat; 
  background-position: left top; 
  text-align: center;
  width: 96%;
  height: 95%;
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
  border: 2px solid #272A30;
  border-radius: 0.4rem;
  color: #FFFFFF;
  background-color: #272A30;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #272A30;
    background-color: #FFFFFF;
  }
`;
