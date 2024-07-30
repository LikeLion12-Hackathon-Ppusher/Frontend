import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import smokeImg from "../../assets/free-icon-smoking-813800.png";
import SetHeader from "./SetHeader";
import detailBackgroundImage from '../../assets/mypage_detail_background.png';

const SetType = () => {
  const [activeBox, setActiveBox] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 사용자 유형을 가져와 상태를 초기화합니다.
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setActiveBox(storedUserType);
    }
  }, []);

  const handleBoxClick = (box) => {
    setActiveBox(box);
  };

  const handleConfirmClick = () => {
    if (activeBox) {
      navigate("/home/set-type-check", { state: { selectedType: activeBox } });
    } else {
      alert("유형을 선택해 주세요.");
    }
  };

  return (
    <SelectContainer>
      <SetHeader headerText="사용자 유형 변경"></SetHeader>
      <SmokeSelect>
        <Box
          isActive={activeBox === "smoker"}
          onClick={() => handleBoxClick("smoker")}
        >
          <img src={smokeImg} alt="흡연자 이미지" />
          <h3>흡연자</h3>
          <div>
            흡연구역 위치 제공
            <br /> 흡연구역 제보
          </div>
        </Box>
        <Box
          isActive={activeBox === "nonSmoker"}
          onClick={() => handleBoxClick("nonSmoker")}
        >
          <img src={smokeImg} alt="비흡연자 이미지" />
          <h3>비흡연자</h3>
          <div>
            상습 흡연구역 제보
            <br /> 간접흡연 위험구역 알림
          </div>
        </Box>
      </SmokeSelect>
      <SelectBtn onClick={handleConfirmClick}>유형 변경하기</SelectBtn>
    </SelectContainer>
  );
};

export default SetType;

const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${detailBackgroundImage}); 
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SmokeSelect = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10% 0;
`;

const Box = styled.div`
  background-color: ${(props) => (props.isActive ? "#FFF100" : "#dedddd")};
  width: 48%;
  height: 18rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    transform: scale(1.05);
    outline: none;
  }

  img {
    width: 30%;
  }

  h3 {
    margin-top: 1rem;
  }

  div {
    margin-top: 1rem;
    font-size: 0.9rem;
    line-height: 1.2rem;
  }
`;

const SelectBtn = styled.div`
  width: 90%;
  background-color: gray;
  padding: 1.5rem 0;
  border-radius: 0.4rem;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  margin-top: 2rem;
`;
