import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SelectContainer, SharedBox, DotsBox, BtnBox, Btn, SelectBtn } from '../../styles/NotifyStyle';
import SetNotifyHeader from "./SetNotifyHeader";

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

const Box = styled(SharedBox)`
  color: #4A4A4A;
`;

const Guide = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #272A30;

  strong {
    color: #4A4A4A;
  }
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