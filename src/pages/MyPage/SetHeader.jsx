import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backButtonImg from "../../assets/arrow-back.png";

const SetHeader = ({ headerText }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="뒤로가기" />
      </BackButton>
      <TypeHeader>{headerText}</TypeHeader>
    </Container>
  );
};

export default SetHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 4%;
  left: 3%;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const TypeHeader = styled.h1`
  font-size: 1.5rem;
  color: #272A30;
  position: absolute;
  top: 8%;
  left: 5%;
  background: linear-gradient(to top, #FFF100 40%, transparent 40%);
`;