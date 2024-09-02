import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SetNotifyHeader from "./SetNotifyHeader";
import dotsImg from '../../assets/background_dots.png';

const SetNotifySmoker = () => {
  const navigate = useNavigate();
  const [activeBox, setActiveBox] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userType, setUserType] = useState(true);

  useEffect(() => {
    const selectedTime = localStorage.getItem('distance') + 'M';
    const userType = localStorage.getItem('userType');

    if (selectedTime) {
      setActiveBox(selectedTime);
      setSelectedTime(selectedTime);
    }

    // smoker
    if (userType === 'SY') {
      setUserType();
    }
  }, []);

  const handleBoxClick = (box, time) => {
    setActiveBox(box);
    setSelectedTime(time);
  };

  const handleConfirmClick = () => {
    if (selectedTime !== null) {
      navigate("/home/mypage", { state: { time: selectedTime } });
    } else {
      alert("시간을 선택해 주세요.");
    }
  };

  return (
    <SelectContainer>
      <SetNotifyHeader></SetNotifyHeader>
      {userType ? (
        <Box>
          <DotsBox>
            <h3>금연구역 알림 설정</h3>
            <Guide>
              금연구역에서 알림을 통해
              <br />
              <strong>가까운 흡연구역 정보</strong>를 확인할 수 있습니다.
            </Guide>
            <BtnBox>
              <Btn
                className={activeBox === 0 ? "active" : ""}
                onClick={() => handleBoxClick(0, "즉시")}
              >
                즉시
              </Btn>
              <Btn
                className={activeBox === 5 ? "active" : ""}
                onClick={() => handleBoxClick(5, "5분")}
              >
                5분
              </Btn>
              <Btn
                className={activeBox === 10 ? "active" : ""}
                onClick={() => handleBoxClick(10, "10분")}
              >
                10분
              </Btn>
            </BtnBox>
          </DotsBox>
        </Box>) : (
        <PlaceholderBox>
          <DotsBox>
            <h3>금연구역 알림 설정</h3>
            <Guide>
              금연구역에서 알림을 통해
              <br />
              <strong>가까운 흡연구역 정보</strong>를 확인할 수 있습니다.
            </Guide>
          </DotsBox>
        </PlaceholderBox>
      )}
      <SelectBtn onClick={handleConfirmClick}>확인</SelectBtn>
    </SelectContainer>
  );
};

export default SetNotifySmoker;

const Guide = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #272A30;

  strong {
    color: #4A4A4A;
  }
`;

const SelectContainer = styled.div`
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90%;
  height: 15rem;
  margin: 5% 0 15% 0;
  border-radius: 0.5rem;
  color: #4A4A4A;
  background-color: #FFF100;
`;

const PlaceholderBox = styled.div`
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

  h3 {
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
  height: 94%;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat; 
  background-position: left top; 
`;


const BtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Btn = styled.div`
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

const SelectBtn = styled.div`
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
