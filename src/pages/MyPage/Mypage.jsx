import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logOut from "../../apis/api";
import { myPageBtns } from "../../data/myPageBtns";
import { Container } from "../../styles/SharedContainer";
import backgroundImage from '../../assets/mypage_background.png';

const Mypage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');

  const handleLogout = async () => {
    try {
      const response = await logOut(accessToken);
      if (response) {
        alert('로그아웃 되었습니다.');
        localStorage.clear();
        navigate("/login");
      } else {
        throw new Error('응답 메세지가 없습니다.');
      }
    } catch (err) {
      alert('API 호출 실패. 로컬에서 로그아웃됩니다.');
      navigate("/home/mypage");
    }
  };

  const buttons = myPageBtns(handleLogout, navigate);

  return (
    <MyPageContainer>
      <MyPageHeader>마이페이지</MyPageHeader>
      <MyPageBtnContainer>
        {buttons.map((button, idx) => (
          <MyPageBtn key={idx} onClick={button.onClick}>
            {button.text}
          </MyPageBtn>
        ))
        }
      </MyPageBtnContainer>
    </MyPageContainer>
  );
};

export default Mypage;

const MyPageContainer = styled(Container)`
  background-image: url(${backgroundImage}); 
  padding-bottom: 6rem;
`

const MyPageHeader = styled.div`
  align-self: flex-start; 
  text-align: left;
  margin-left: 5%;
  font-size: 1.6rem;
  font-weight: bold;
  background: linear-gradient(to top, #FFF100 40%, transparent 40%);
`;

const MyPageBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const MyPageBtn = styled.button`
  width: 100%;
  margin-top: 3vh;
  border: 2px solid #272A30;
  border-radius: 0.3rem;
  padding: 1rem 0;
  font-size: 1rem;
  font-weight: bold;
  color: #FFF100;
  background-color: #272A30;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0.2rem 0.2rem 0.2rem;

  cursor: pointer;

  &:hover,
  &:focus {
    outline: none; 
    color: #272A30;
    background-color: #FFF100;
    transform: scale(1.005);
  }

  &.active {
    background-color: white;
    transform: scale(1.005);
  }
`;