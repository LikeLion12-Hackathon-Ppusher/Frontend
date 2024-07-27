import React from "react";
import styled from "styled-components";

const Select = () => {
  return (
    <SelectContainer>
      <h3>유형을 선택해 주세요</h3>
      <SmokeSelect>
        <div>1</div>
        <div>2</div>
      </SmokeSelect>
      <div>3</div>
    </SelectContainer>
  );
};

export default Select;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SmokeSelect = styled.div``;
