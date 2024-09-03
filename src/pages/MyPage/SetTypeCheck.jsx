import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import SharedHeader from "../../components/SharedHeader";
import { Container } from "../../styles/SharedContainer";
import detailBackgroundImage from "../../assets/mypage_detail_background.png";
import dotsImg from '../../assets/background_dots.png';

const SetTypeCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { selectedType } = location.state || {};

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    if (selectedType === "smoker") {
      selectedType = "SY";
    } else if (selectedType === "nonSmoker") {
      selectedType = "SN";
    } else {
      alert("사용자 유형 변경에 실패했습니다.");
    }
    localStorage.setItem("userType", selectedType);
    navigate("/home/set-type-confirm", { state: { userType: selectedType } });
  };

  return (
    <TypeCheckContainer>
      <SharedHeader headerText={"사용자 유형 변경"}></SharedHeader>
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
    </TypeCheckContainer>
  );
};

export default SetTypeCheck;

const TypeCheckContainer = styled(Container)`
  background-image: url(${detailBackgroundImage});
  background-color: #fbc1c1;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 90%;
  margin-bottom: 6rem;
  border-radius: 6px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #fff100;

  p {
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
  height: 95%;
  padding: 3.5rem 0rem 1.5rem 0rem;
  background-image: url(${dotsImg});  
  background-size: 50%;  
  background-repeat: no-repeat; 
  background-position: left top; 

  p {
    color: #272A30;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 0.4rem;
  width: 60%;
`;

const Button = styled.button`
  text-align: center;
  width: 45%;
  height: 2rem;
  margin-top: 1rem;
  border: 2px solid #272A30;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #272A30;

  cursor: pointer;

  &:hover {
    color: #000000;
    background-color: #FFFFFF;
  }
`;
