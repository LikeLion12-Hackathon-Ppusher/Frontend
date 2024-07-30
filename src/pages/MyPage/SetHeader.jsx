import React from 'react';
import backButtonImg from "../../assets/arrow-back.png";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  top: 6rem;
  left: 1rem;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const TypeHeader = styled.h1`
  width: 90%;
  font-size: 32px;
  position: absolute;
  top: 9rem;
`;