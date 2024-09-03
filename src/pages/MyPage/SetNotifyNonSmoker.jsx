import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SelectContainer, SharedBox, DotsBox, BtnBox, Btn, SelectBtn } from '../../styles/NotifyStyle';
import SetNotifyHeader from "./SetNotifyHeader";
import { putMyPageDistAPI } from "../../apis/api";

const SetNotifyNonSmoker = () => {
  const navigate = useNavigate();
  const [activeBox, setActiveBox] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);

  useEffect(() => {
    const selectedDistance = localStorage.getItem('distance') + 'm';
    if (selectedDistance) {
      setActiveBox(selectedDistance);
      setSelectedDistance(selectedDistance);
    }
  }, []);

  const handleBoxClick = (box, distance) => {
    const token = localStorage.getItem('access_token');
    setActiveBox(box);
    setSelectedDistance(distance);
    localStorage.setItem('distance', distance);

    putMyPageDistAPI(token, distance);
  };

  const handleConfirmClick = () => {
    if (selectedDistance) {
      navigate("/home/mypage", { state: { distance: selectedDistance } });
    } else {
      alert("거리를 선택해 주세요.");
    }
  };

  return (
    <SelectContainer>
      <SetNotifyHeader></SetNotifyHeader>
      <Box>
        <DotsBox>
          <h3>간접흡연 위험구역 알림 설정</h3>
          <div>
            간접흡연 위험 지역에서
            <br /> 알림을 받을 수 있습니다.
          </div>
          <BtnBox>
            <Btn
              className={activeBox === "10m" ? "active" : ""}
              onClick={() => handleBoxClick("10m", 10)}
            >
              10M
            </Btn>
            <Btn
              className={activeBox === "20m" ? "active" : ""}
              onClick={() => handleBoxClick("20m", 20)}
            >
              20M
            </Btn>
            <Btn
              className={activeBox === "30m" ? "active" : ""}
              onClick={() => handleBoxClick("30m", 30)}
            >
              30M
            </Btn>
          </BtnBox></DotsBox>
      </Box>
      <SelectBtn onClick={handleConfirmClick}>확인</SelectBtn>
    </SelectContainer>
  );
};

export default SetNotifyNonSmoker;

const Box = styled(SharedBox)`
  h3 {
    font-size: 1.2rem;
  }
`;