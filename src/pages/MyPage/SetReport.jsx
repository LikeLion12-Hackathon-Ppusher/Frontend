import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backButtonImg from "../../assets/arrow-back.png";
import bottomButtonImg from "../../assets/bottom_arrow.png";
import upButtonImg from "../../assets/top_arrow.png";

const reports = [
  { id: 1, address: '주소 어쩌구1', detail: '상세 위치 설명 썰라썰라' },
  { id: 2, address: '주소 어쩌구2', detail: '상세 위치 설명 썰라썰라' },
  { id: 3, address: '주소 어쩌구3', detail: '상세 위치 설명 썰라썰라' },
  { id: 4, address: '주소 어쩌구4', detail: '상세 위치 설명 썰라썰라' },
  { id: 5, address: '주소 어쩌구5', detail: '상세 위치 설명 썰라썰라' },
  { id: 6, address: '주소 어쩌구6', detail: '상세 위치 설명 썰라썰라' },
  { id: 7, address: '주소 어쩌구7', detail: '상세 위치 설명 썰라썰라' },
  { id: 8, address: '주소 어쩌구8', detail: '상세 위치 설명 썰라썰라' },
  { id: 9, address: '주소 어쩌구9', detail: '상세 위치 설명 썰라썰라' },
  { id: 10, address: '주소 어쩌구10', detail: '상세 위치 설명 썰라썰라' }
];

const SetAccount = () => {
  const navigate = useNavigate();
  const [openReportId, setOpenReportId] = useState(null);

  const handleToggle = (id) => {
    setOpenReportId(openReportId === id ? null : id);
  };

  const handleBack = () => {
    navigate("/home/mypage");
  };

  return (
    <AccountContainer>
      <BackButton onClick={handleBack}>
        <img src={backButtonImg} alt="뒤로가기" />
      </BackButton>
      <TypeHeader>제보내역</TypeHeader>
      <ReportContainer>
        {reports.map(report => (
          <ReportItem key={report.id}>
            <ReportHeader onClick={() => handleToggle(report.id)}>
              <span>제보하기</span>
              <DropdownArrow>
                <img src={openReportId === report.id ? upButtonImg : bottomButtonImg} alt="토글" />
              </DropdownArrow>
            </ReportHeader>
            <ReportContent>
              {report.address}
            </ReportContent>
            <ReportDetail isOpen={openReportId === report.id}>
              <DetailText>{report.detail}</DetailText>
              <Status>
                <StatusGroup>
                  <span>청결도</span>
                  <div>
                    <StatusCircle filled />
                    <StatusCircle filled />
                    <StatusCircle filled />
                    <StatusCircle />
                    <StatusCircle />
                  </div>
                </StatusGroup>
                <ButtonGroup>
                  <ActionButton>실내</ActionButton>
                  <ActionButton>재떨이</ActionButton>
                </ButtonGroup>
              </Status>
            </ReportDetail>
          </ReportItem>
        ))}
      </ReportContainer>
    </AccountContainer>
  );
};

export default SetAccount;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
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

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 15rem); 
  overflow-y: auto;
  margin-top: 15rem;
  margin-bottom: 5rem;
  padding: 0 1rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const ReportItem = styled.div`
  width: 100%;
  background-color: #dedddd;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const ReportContent = styled.div`
  font-size: 24px;
`;

const DropdownArrow = styled.span`
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const ReportDetail = styled.div`
  margin-top: 0.5rem;
  max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.35s ease-in-out; 
  background-color: #f1f1f1;
  border-radius: 0.5rem;
  padding: 0 1rem 0rem 1rem;
`;

const DetailText = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 0.5rem;

  span {
    margin-right: 0.5rem;

  }

  div {
    display: flex;
    align-items: center;
  }
`;

const StatusGroup = styled.div`
  display: flex;
  border-radius: 6px;
  padding: 0.2rem 1rem;
  background-color: white;
  margin-right: 0.5rem;
`;

const StatusCircle = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 0.3rem;
  border-radius: 50%;
  background-color: ${props => (props.filled ? 'black' : 'lightgray')};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.2rem 1rem;
  font-size: 16px;
  background: none;
  border: 2px solid #000;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
