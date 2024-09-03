// SetReort.jsx 에서 청결도 박스에 해당하는 컴포넌트입니다.
import React from 'react';
import styled from 'styled-components';

const CleanRateBox = ({ rate }) => {
  const totalCircles = 5;
  const filledCircles = parseInt(rate, 10); // rate를 숫자로 변환

  return (
    <StatusGroup>
      <span>청결도 </span>
      <div>
        {Array.from({ length: totalCircles }, (_, index) => (
          <StatusCircle key={index} filled={index < filledCircles} />
        ))}
      </div>
    </StatusGroup>
  );
};

export default CleanRateBox;

const StatusGroup = styled.div`
  display: flex;
  margin-right: 0.5rem;
  border: 1px solid #272A30;
  border-radius: 6px;
  padding: 0.2rem 0.4rem;
  font-size: 0.6rem;
  font-weight: bold;
  color: #FFFFFF;
  background-color: #272A30;
`;

const StatusCircle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.2rem;
  border: 0.1rem solid #FFFDE2;
  border-radius: 50%;
  background-color: ${props => (props.filled ? '#FFFDE2' : '#272A30')};
`;
