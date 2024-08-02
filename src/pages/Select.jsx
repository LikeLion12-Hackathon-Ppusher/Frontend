import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import smokerImg from "../assets/smoker.png";
import nonSmokerImg from "../assets/nonSmoker.png";
import BackgroundImg from "../assets/background.png";
import axios from "axios";

const Select = () => {
  const [activeBox, setActiveBox] = useState(null);
  const navigate = useNavigate();

  const handleBoxClick = (box) => {
    // 문자열 "smoker" or "nonSmoker" 를 넘겨줘서 상태를 저장한다
    setActiveBox(box);
  };
  const access = localStorage.getItem("access_token");

  const handleConfirmClick = async () => {
    if (activeBox === "smoker") {
      const res1 = await axios.put(
        "https://bbuhackathon.p-e.kr/oauth/user/mypage/type/",
        { userType: "SY" },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(res1);
      localStorage.setItem("userType", "SY");
      navigate("/home/map", { state: { userType: "SY", data: res1.data } });
    } else if (activeBox === "nonSmoker") {
      const res2 = await axios.put(
        "https://bbuhackathon.p-e.kr/oauth/user/mypage/type/",
        { userType: "SN" },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(res2);
      localStorage.setItem("userType", "SN");
      navigate("/home/map", { state: { userType: "SN", data: res2.data } });
    } else {
      alert("유형을 선택해 주세요.");
    }
  };

  return (
    <SelectContainer>
      <h2>유형을 선택해 주세요</h2>
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
      <SelectBtn onClick={handleConfirmClick}>확인</SelectBtn>
    </SelectContainer>
  );
};

export default Select;

const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${BackgroundImg});
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  h2 {
    background: linear-gradient(to top, #fff100 40%, transparent 40%);
  }
`;

const SmokeSelect = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10% 0;
`;

const SmokerBox = styled.div`
  background-color: #212121;
  width: 48%;
  height: 16rem;
  border: 2px solid #f7f152;
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
    // background-color: #c0c0c0;
    transform: scale(1.05);
    outline: none; /* 포커스 시에 기본 아웃라인을 없애기 위해 */
  }

  &.active {
    // background-color: gray;
    transform: scale(1.05);
  }

  img {
    width: 30%;
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
`;

const NonSmokerBox = styled.div`
  background-color: #f7f152;
  width: 48%;
  height: 16rem;
  border: 2px solid black;
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
    // background-color: #c0c0c0;
    transform: scale(1.05);
    outline: none; /* 포커스 시에 기본 아웃라인을 없애기 위해 */
  }

  &.active {
    // background-color: gray;
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
  background-color: white;
  padding: 1rem 0;
  border: 2px solid black;
  border-radius: 0.3rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
`;
