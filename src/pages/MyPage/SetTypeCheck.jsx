import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import SharedHeader from "../../components/SharedHeader";
import { Container } from "../../styles/SharedContainer";
import { Box, DotsBox, BtnContainer, Btn } from "../../styles/SetTypeStyle";
import detailBackgroundImage from "../../assets/mypage_detail_background.png";

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
          <BtnContainer>
            <Btn onClick={handleCancel}>취소</Btn>
            <Btn onClick={handleConfirm}>확인</Btn>
          </BtnContainer>
        </DotsBox>
      </Box>
    </TypeCheckContainer>
  );
};

export default SetTypeCheck;

const TypeCheckContainer = styled(Container)`
  background-image: url(${detailBackgroundImage});
`;
