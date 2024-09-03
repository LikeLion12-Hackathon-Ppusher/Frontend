import styled from 'styled-components';
import dotsImg from '../assets/background_dots.png';

export const Box = styled.div`
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

export const DotsBox = styled.div`
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

  p {
    color: #272A30;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin-top: 0.4rem;
`;

export const Btn = styled.button`
  text-align: center;
  width: 45%;
  height: 2rem;
  margin-top: 1rem;
  border: 2px solid #272A30;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #272A30;

  cursor: pointer;

  &:hover {
    color: #000000;
    background-color: #FFFFFF;
  }
`;
