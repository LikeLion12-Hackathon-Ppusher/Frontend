import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SetNotifyHeader from "./SetNotifyHeader";
import dotsImg from '../../assets/background_dots.png';
import { putMyPageTimeAPI } from "../../apis/api";

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

    if (userType === 'SY') { // 흡연자인 경우
      setUserType();
    }
  }, []);

  const handleBoxClick = (box, time) => {
    setActiveBox(box);
    setSelectedTime(time);
  };

  const handleConfirmClick = () => {
    const token = localStorage.getItem('access_token');
    if (selectedTime !== null) {
      // putMyPageTimeAPI(token, selectedTime); 시간 설정 API 미사용
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
  font-size: 1rem;
  color: #272A30;
  margin-bottom: 1rem;
  strong {
    color: #4A4A4A;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 10%;
  }
`;

const Box = styled.div`
  color: #4A4A4A;
  background-color: #FFF100;
  width: 90%;
  height: 15rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5% 0 15% 0;
`;

const PlaceholderBox = styled.div`
  background-color: #FFF100;
  width: 90%;
  height: 15rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5% 0 15% 0;

  h3 {
    font-size: 1.2rem;
  }
`;


const DotsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat; 
  background-position: left top; 
  text-align: center;
  width: 96%;
  height: 94%;
`;


const BtnBox = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-evenly;
  width: 90%;
`;

const Btn = styled.div`
  padding: 0.8rem 1.2rem;
  background-color: #272A30;
  border-radius: 0.4rem;
  cursor: pointer;
  color: white;
  border: 2px solid transparent;
  &:hover,
  &:focus {
    background-color: #f7f152;
    color: black;

    outline: none; /* 포커스 시에 기본 아웃라인을 없애기 위해 */
    border: 2px solid black;
  }

  &.active {
    background-color: #f7f152;
    color: black;
    border: 2px solid black;
  }
`;

const SelectBtn = styled.div`
  width: 90%;
  color: white;
  background-color: #272A30;
  padding: 1rem 0;
  border-radius: 0.3rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0.3rem 0.3rem 0.3rem #FEFBBD;
`;
