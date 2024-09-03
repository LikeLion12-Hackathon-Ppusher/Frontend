import styled from 'styled-components';
import dotsImg from '../assets/background_dots.png';

// without 'Shared' means use it directly
// with 'Shared' means it has been customed
export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    width: 10%;
  }
`;

export const SharedBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90%;
  height: 15rem;
  margin: 5% 0 15% 0;
  border-radius: 0.5rem;
  background-color: #FFF100;
`;

export const DotsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 96%;
  height: 94%;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat; 
  background-position: left top; 
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const Btn = styled.div`
  border: 2px solid transparent;
  border-radius: 0.4rem;
  padding: 0.8rem 1.2rem;
  color: white;
  background-color: #272A30;

  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
    background-color: #f7f152;

    outline: none; 
    border: 2px solid black;
  }

  &.active {
    color: black;
    background-color: #f7f152;
    border: 2px solid black;
  }
`;

export const SelectBtn = styled.div`
  width: 90%;
  border: 2px solid black;
  border-radius: 0.3rem;
  padding: 1rem 0;
  text-align: center;
  font-weight: bold;
  color: white;
  background-color: #272A30;
  box-shadow: 0.2rem 0.2rem 0.2rem #FEFBBD;

  cursor: pointer;
`;
