import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  width: 16px;
  height: 20px;
  fill: ${({ color }) => color || "black"};
`;

export const ReportIcon = ({ color }) => (
  <SVG
    width="16"
    height="20"
    viewBox="0 0 16 20"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
  >
    <path d="M9 9H7V12H4V14H7V17H9V14H12V12H9V9ZM10 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0ZM14 18H2V2H9V7H14V18Z" />
  </SVG>
);

export const AnotherIcon = ({ color }) => (
  <SVG
    width="16"
    height="20"
    viewBox="0 0 16 20"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
  >
    {/* 여기에 다른 SVG의 path 데이터 입력 */}
    <path d="..." />
  </SVG>
);

// 필요한 만큼 SVG 아이콘을 추가
