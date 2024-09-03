import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';
import styled from "styled-components";
import loadingBack from '../assets/initial_background.png';
import logoImage from '../assets/loading.svg';

const Redirection = () => {
  const navigate = useNavigate();
  // 쿼리 스트링에서 인가 코드 추출
  const code = new URLSearchParams(window.location.search).get("code");
  const url = `https://bbuhackathon.p-e.kr/oauth/kakao/callback/`;

  useEffect(() => {
    if (code) {
      handleAPIResponse();
    }
  }, [code]);

  // API 호출로 자체 access_token 불러오기
  const handleAPIResponse = async () => {
    try {
      // 인가 코드를 백엔드로 전달
      const res = await axios.post(url, {
        authorizationCode: code,
      });
      const status = res.status;
      // 초기 세팅 값을 localStorage에 저장
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("userType", res.data.user.userType);
      localStorage.setItem("userId", res.data.user.userId);
      localStorage.setItem("distance", res.data.setting.distance);
      localStorage.setItem("option", res.data.setting.option);
      handleRoute(status);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoute = (status) => {
    if (status === 200) { // 기존 회원
      navigate("/home/map");
    } else if (status === 201) { // 회원 가입
      navigate("/home/select");
    } else {
      alert("Response Error");
    }
  };

  return (
    <LoadingContainer>
      <img src={logoImage} className="spinner" alt="logo" />
    </LoadingContainer>
  );
};

export default Redirection;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${loadingBack});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  img {
    width: 20%;
  }
`;