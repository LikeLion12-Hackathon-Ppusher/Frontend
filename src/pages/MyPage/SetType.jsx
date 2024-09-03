import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SharedHeader from "../../components/SharedHeader";
import { Container } from "../../components/SharedContainer";
import smokerImg from "../../assets/smoker.png";
import nonSmokerImg from "../../assets/nonSmoker.png";
import detailBackgroundImage from '../../assets/mypage_detail_background.png';

const SetType = () => {
  const [activeBox, setActiveBox] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
      <SharedHeader headerText="사용자 유형 변경"></SharedHeader>
      <SmokeSelect>
        <SmokerBox
          className={activeBox === "smoker" ? "active" : ""}
          onClick={() => handleBoxClick("smoker")}
        >
          <img src={smokerImg} alt="흡연자 이미지" />
          <h3>흡연자</h3>
          <div>
            흡연구역 위치 제공
            <br /> 흡연구역 제보
          </div>
        </SmokerBox>
        <NonSmokerBox
          className={activeBox === "nonSmoker" ? "active" : ""}
          onClick={() => handleBoxClick("nonSmoker")}
        >
          <img src={nonSmokerImg} alt="비흡연자 이미지" />
          <h3>비흡연자</h3>
          <div>
            상습 흡연구역 제보
            <br /> 간접흡연 위험구역 알림
          </div>
        </NonSmokerBox>
      </SmokeSelect>
      <SelectBtn onClick={handleConfirmClick}>유형 변경하기</SelectBtn>
    </SelectContainer>
  );
};

export default SetType;

const SelectContainer = styled(Container)`
  background-image: url(${detailBackgroundImage});
  background-color: #FFFFFF; 
  
  h2 {
    background: linear-gradient(to top, #fff100 40%, transparent 40%);
  }
`

const SmokeSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 10% 0;
`;

const SmokerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 48%;
  height: 16rem;
  border: 2px solid #f7f152;
  border-radius: 0.5rem;
  background-color: #212121;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0.25rem 0.25rem 0.25rem #D9D9D9;

  cursor: pointer;

  &:hover,
  &:focus {
    transform: scale(1.05);
    outline: none;
  }

  &.active {
    transform: scale(1.05);
  }

  h3 {
    margin-top: 1rem;
    color: #f7f152;
  }

  div {
    margin-top: 1rem;
    font-size: 0.9rem;
    line-height: 1.2rem;
    color: #bbbbbb;
  }
  
  img {
    width: 30%;
  }

`;

const NonSmokerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 48%;
  height: 16rem;
  border: 2px solid #272A30;
  border-radius: 0.5rem;
  background-color: #f7f152;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0.25rem 0.25rem 0.25rem #D9D9D9;

  cursor: pointer;

  &:hover,
  &:focus {
    transform: scale(1.05);
    outline: none;
  }

  &.active {
    transform: scale(1.05);
  }

  h3 {
    margin-top: 1rem;
  }

  div {
    margin-top: 1rem;
    font-size: 0.9rem;
    line-height: 1.2rem;
  }

  img {
    width: 30%;
  }
`;

const SelectBtn = styled.div`
  text-align: center;
  width: 90%;
  border: 2px solid #272A30;
  border-radius: 0.3rem;
  padding: 1rem 0;
  font-weight: bold;
  background-color: #FFFFFF;

  cursor: pointer;
`;
