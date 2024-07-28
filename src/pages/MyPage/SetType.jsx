import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import smokeImg from "../../assets/free-icon-smoking-813800.png";
import backButtonImg from "../../assets/arrow-back.png";

const SetType = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBoxClick = (box) => {
    setActiveBox(box);
  };

  const handleConfirmClick = () => {
    if (activeBox) {
      setIsModalOpen(true);
    } else {
      alert("유형을 선택해 주세요.");
    }
  };

  const confirmChange = () => {
    setIsModalOpen(false);
    if (activeBox === "smoker") {
      navigate("/select-smoker");
    } else if (activeBox === "nonSmoker") {
      navigate("/select-non-smoker");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SelectContainer>
      <BackButton onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="뒤로가기" />
      </BackButton>
      <TypeHeader>사용자 유형 변경</TypeHeader>
      <SmokeSelect>
        <Box
          className={activeBox === "smoker" ? "active" : ""}
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
          className={activeBox === "nonSmoker" ? "active" : ""}
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

      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <h2>정말 변경하시겠습니까?</h2>
            <ButtonContainer>
              <ModalButton onClick={closeModal}>취소</ModalButton>
              <ModalButton onClick={confirmChange}>확인</ModalButton>
            </ButtonContainer>
          </Modal>
        </ModalOverlay>
      )}
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
  background-color: white;
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

const SmokeSelect = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10% 0;
`;

const Box = styled.div`
  background-color: #dedddd;
  width: 48%;
  height: 18rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #c0c0c0;
    transform: scale(1.05);
    outline: none; 
  }

  &.active {
    background-color: gray;
    transform: scale(1.05);
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
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 4rem 8rem 4rem 8rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
