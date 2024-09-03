import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SharedHeader from '../../components/SharedHeader';
import { Container } from '../../styles/SharedContainer';
import { Box, DotsBox, BtnContainer, Btn } from '../../styles/SetTypeStyle';
import detailBackgroundImage from '../../assets/mypage_detail_background.png';

const SetTypeConfirm = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/home/mypage");
  };

  return (
    <TypeConfirmContainer>
      <SharedHeader headerText="사용자 유형 변경"></SharedHeader>
      <Box>
        <DotsBox>
          <p>변경이 <strong>완료</strong>되었습니다.</p>
          <BtnContainer>
            <Btn onClick={handleConfirm}>확인</Btn>
          </BtnContainer>
        </DotsBox>
      </Box>
    </TypeConfirmContainer>
  );
};

export default SetTypeConfirm;

const TypeConfirmContainer = styled(Container)`
  background-image: url(${detailBackgroundImage}); 
`;