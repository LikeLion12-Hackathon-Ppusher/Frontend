import React, { useState } from 'react';
import styled from 'styled-components';
import bottomButtonImg from "../../assets/down.png";
import upButtonImg from "../../assets/up.png";
import SetHeader from './SetHeader';

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
  const [openReportId, setOpenReportId] = useState(null);

  const handleToggle = (id) => {
    setOpenReportId(openReportId === id ? null : id);
  };

  return (
    <AccountContainer>
      <SetHeader headerText="제보 내역"></SetHeader>
      <ReportContainer>
        {reports.map(report => (
          <ReportItem key={report.id} isOpen={openReportId === report.id}>
            <ReportHeader onClick={() => handleToggle(report.id)} isOpen={openReportId === report.id}>
              <span>{report.address}</span>
              <DropdownArrow>
                <img src={openReportId === report.id ? upButtonImg : bottomButtonImg} alt="토글" />
              </DropdownArrow>
            </ReportHeader>
            <ReportDetail isOpen={openReportId === report.id}>
              <ReportContent>
                {report.detail}
              </ReportContent>
              <DetailText>내가 기록해놓은 정보 샘플</DetailText>
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

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  margin-top: 30%;
  margin-bottom: 4rem;
  padding: 0 0.5rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 0.3rem;
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
  color: ${({ isOpen }) => (isOpen ? 'black' : 'white')};
  background-color: ${({ isOpen }) => (isOpen ? '#FFF100' : 'black')}; 
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem;
  font-size: 1.2rem;
`;

const ReportContent = styled.div`
  font-size: 1rem;
`;

const DropdownArrow = styled.span`
  img {
    width: 2rem;
  }
`;

const ReportDetail = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '100vh' : '0')};
  margin: ${({ isOpen }) => (isOpen ? '0rem 1rem 1rem' : '0rem 1rem 0rem')};
  padding: ${({ isOpen }) => (isOpen ? '1rem' : '0rem 1rem 0rem')};
  overflow: hidden;
  transition: 0.25s ease-in-out; 
  color: black;
  border-radius: 0.5rem;
  background-color: white;
`;

const DetailText = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: gray;
`;

const Status = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;

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
  border: 1px solid black;
  border-radius: 6px;
  padding: 0.2rem 0.4rem;
  background-color: #FFFDE2;
  margin-right: 0.5rem;
  font-size: 0.8rem;
`;

const StatusCircle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.3rem;
  border-radius: 50%;
  background-color: ${props => (props.filled ? '#FFF100' : 'lightgray')};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ActionButton = styled.button`
  padding: 0.2rem 0.8rem;
  font-size: 0.8rem;
  background-color: #FFFDE2;
  border: 1px solid #000;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #FFF100;
  }
`;
