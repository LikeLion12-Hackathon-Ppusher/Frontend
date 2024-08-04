import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bottomButtonImg from "../../assets/down.png";
import upButtonImg from "../../assets/up.png";
import SetHeader from './SetHeader';
import reportBckgrnd from '../../assets/report_background.png';

import { deletePlaceAPI, getMyPageReportAPI, getReportDetailAPI } from '../../apis/api';

// const reports = [
//   { id: 1, address: '주소 어쩌구1', detail: '상세 위치 설명 썰라썰라' },
//   { id: 2, address: '주소 어쩌구2', detail: '상세 위치 설명 썰라썰라' },
//   { id: 3, address: '주소 어쩌구3', detail: '상세 위치 설명 썰라썰라' },
//   { id: 4, address: '주소 어쩌구4', detail: '상세 위치 설명 썰라썰라' },
//   { id: 5, address: '주소 어쩌구5', detail: '상세 위치 설명 썰라썰라' },
//   { id: 6, address: '주소 어쩌구6', detail: '상세 위치 설명 썰라썰라' },
//   { id: 7, address: '주소 어쩌구7', detail: '상세 위치 설명 썰라썰라' },
//   { id: 8, address: '주소 어쩌구8', detail: '상세 위치 설명 썰라썰라' },
//   { id: 9, address: '주소 어쩌구9', detail: '상세 위치 설명 썰라썰라' },
//   { id: 10, address: '주소 어쩌구10', detail: '상세 위치 설명 썰라썰라' }
// ];
// const ports = await getMyPageReportAPI();
// console.log('나의 제보 내역:', ports);
// const transformData = async () => {
//   const ports = await getMyPageReportAPI();
//   console.log('나의 제보 내역:', ports);

//   const report = ports.
// };

// console.log('나의 제보 내역:', rports);
// rports.forEach(item => {
//   console.log(`아이디: ${item.reportId}`);
//   // console.log(`주소: ${item.reportSmokingPlace.address}`);
// });

const SetAccount = () => {
  const [openReportId, setOpenReportId] = useState(null);
  const [rports, setRports] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    getMyPageReportAPI()
      .then(res => {
        setRports(res);
      })
      .catch(err => console.error('Error fetching reports:', err));
  }, []);

  const reports = rports.map(item => ({
    id: item.reportId,
    address: item.reportType === "SM" ? item.reportSmokingPlace.address : item.secondhandSmokingPlace.address,
    description: item.description,
    rate: item.reportType === "SM" ? item.reportSmokingPlace.rate : null,
    isIndoor: item.reportType === "SM" ? item.reportSmokingPlace.isIndoor : null,
    ashtray: item.reportType === "SM" ? item.reportSmokingPlace.ashtray : null,
  }));
  console.log('응답:', reports);
  const handleToggle = (id) => {
    getReportDetailAPI(id);
    setOpenReportId(openReportId === id ? null : id);
  };

  const handleDelete = (reportId) => {
    deletePlaceAPI(token, reportId)
      .then(() => {
        alert('제보가 삭제됩니다.');
        fetchReports();  // 삭제 후 목록을 다시 불러옴
      })
      .catch(err => {
        console.error('Error deleting report:', err);
        alert('제보 삭제에 실패했습니다.');
      });
  };

  const fetchReports = () => {
    getMyPageReportAPI()
      .then(res => {
        setRports(res);
      })
      .catch(err => console.error('Error fetching reports:', err));
  };

  const StatusGroupComponent = ({ rate }) => {
    const totalCircles = 5;
    const filledCircles = parseInt(rate, 10); // rate를 숫자로 변환

    return (
      <StatusGroup>
        <span>청결도 </span>
        <div>
          {Array.from({ length: totalCircles }, (_, index) => (
            <StatusCircle key={index} filled={index < filledCircles} />
          ))}
        </div>
      </StatusGroup>
    );
  };

  return (
    <AccountContainer>
      <SetHeader headerText="제보 내역"></SetHeader>
      <ReportContainer>
        {reports.map(report => (
          <ReportItem key={report.id} isOpen={openReportId === report.id}>
            <ReportHeader isOpen={openReportId === report.id} onClick={() => handleToggle(report.id)}>
              <span>{report.address}</span>
              <DropdownArrow>
                <img src={openReportId === report.id ? upButtonImg : bottomButtonImg} alt="토글" />
              </DropdownArrow>
            </ReportHeader>
            <ReportDetail isOpen={openReportId === report.id}>
              <ReportContent>
                {report.detail}
              </ReportContent>
              <DetailText>{report.description}</DetailText>
              <Status>
                {report.rate && <StatusGroupComponent rate={report.rate} />}
                <ButtonGroup>
                  {report.isIndoor && <ActionButton>실내</ActionButton>}
                  {report.ashtray && <ActionButton>재떨이</ActionButton>}
                  <ActionButton onClick={() => handleDelete(report.id)}>삭제</ActionButton>
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
  padding: 1rem;
  box-sizing: border-box;
  background-image: url(${reportBckgrnd}); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 700;
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  margin-top: 15vh;
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
  background-color: ${({ isOpen }) => (isOpen ? '#FEFBBD' : '#272A30')}; 
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #272A30;
  cursor: pointer;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem;
  font-size: 1.2rem;
  color: ${({ isOpen }) => (isOpen ? '#272A30' : '#EDEDED')};
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
  color: #272A30;
  border-radius: 0.5rem;
  background-color: white;
`;

const DetailText = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #272A30;
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
  border: 1px solid #272A30;
  border-radius: 6px;
  padding: 0.2rem 0.4rem;
  color: #FFFFFF;
  background-color: #272A30;
  margin-right: 0.5rem;
  font-size: 0.8rem;
`;

const StatusCircle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.2rem;
  border-radius: 50%;
  border: 0.1rem solid #FFFDE2;
  background-color: ${props => (props.filled ? '#FFFDE2' : '#272A30')};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ActionButton = styled.button`
  padding: 0.2rem 0.8rem;
  font-size: 0.8rem;
  background-color: #FFFDE2;
  border: 1.2px solid #272A30;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #FFF100;
  }
`;
