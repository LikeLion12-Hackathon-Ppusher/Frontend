import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import SetHeader from "./SetHeader";
import detailBackgroundImage from "../../assets/mypage_detail_background.png";
import { putUserTypeAPI } from "../../apis/api";
import dotsImg from '../../assets/background_dots.png';

const SetTypeCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { selectedType } = location.state || {};

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    const token = localStorage.getItem("access_token");
    if (selectedType === "smoker") {
      selectedType = "SY";
    } else if (selectedType === "nonSmoker") {
      selectedType = "SN";
    } else {
      alert("asdf");
    }

    const status = putUserTypeAPI(token, selectedType);
    console.log("PUT 응답 상태:", status);
    localStorage.setItem("userType", selectedType);

    navigate("/home/set-type-confirm", { state: { userType: selectedType } });
  };

  return (
    <Container>
      <SetHeader headerText={"사용자 유형 변경"}></SetHeader>
      <Box>
        <DotsBox>
          <p>
            정말 <strong>변경</strong>하시겠습니까?
          </p>
          <ButtonContainer>
            <Button onClick={handleCancel}>취소</Button>
            <Button onClick={handleConfirm}>확인</Button>
          </ButtonContainer>
        </DotsBox>
      </Box>
    </Container>
  );
};

export default SetTypeCheck;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${detailBackgroundImage});
  background-color: #FFFFFF;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 700;
`;

const Box = styled.div`
  background-color: #fff100;
  border-radius: 6px;
  margin-bottom: 6rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  p {
    font-size: 1.2rem;
  }
`;

const DotsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.5rem 0rem 1.5rem 0rem;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat; 
  background-position: left top; 
  text-align: center;
  width: 96%;
  height: 95%;
  p {
    color: #272A30;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-around;
  width: 60%;
`;

const Button = styled.button`
  width: 45%;
  height: 2rem;
  margin-top: 1rem;
  border: 2px solid #272A30;
  border-radius: 0.4rem;
  color: #ffffff;
  background-color: #272A30;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #000000;
    background-color: #FFFFFF;
  }
`;
