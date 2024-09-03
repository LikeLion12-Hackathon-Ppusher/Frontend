import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SharedHeader from '../../components/SharedHeader';
import CleanRateBox from '../../components/CleanRateBox';
import { deletePlaceAPI, getLikesCountAPI, getMyPageReportAPI, getReportDetailAPI } from '../../apis/api';
import bottomButtonImg from "../../assets/down.png";
import upButtonImg from "../../assets/up.png";
import blackX from "../../assets/trashcan.png";
import coloredX from "../../assets/colored_trashcan.png";
import reportBckgrnd from '../../assets/report_background.png';
import likeImg from '../../assets/like.png';

const SetAccount = () => {
  const token = localStorage.getItem('access_token');
  const [noReports, setNoReports] = useState();
  const [responses, setResponses] = useState([]);
  const [likes, setLikes] = useState();
  const [openReportId, setOpenReportId] = useState(null);

  useEffect(() => {
    setNoReports(false);
    getMyPageReportAPI()
      .then(res => {
        if (res.length > 0) {
          setResponses(res);
        } else {
          setNoReports(true);
        }
      })
      .catch(err => console.error('Error fetching reports:', err));
  }, []);

  // 나의 제보 내역을 호출하고 필요한 항목을 매핑합니다.
  const reports = responses.map(item => ({
    id: item.reportId,
    address: item.reportType === "SM" ? item.reportSmokingPlace.address : item.secondhandSmokingPlace.address,
    description: item.description,
    rate: item.reportType === "SM" ? item.reportSmokingPlace.rate : null,
    isIndoor: item.reportType === "SM" ? item.reportSmokingPlace.isIndoor : null,
    ashtray: item.reportType === "SM" ? item.reportSmokingPlace.ashtray : null,
    placeId: item.reportType === "SM" ? item.reportSmokingPlace.placeId : item.secondhandSmokingPlace.placeId,
    reportType: item.reportType,
  }));

  const handleToggle = (id) => {
    getReportDetailAPI(id);
    setOpenReportId(openReportId === id ? null : id);
  };

  const handleDelete = async (reportId) => {
    await deletePlaceAPI(token, reportId)
      .then(() => {
        alert('제보가 삭제됩니다.');
        fetchReports();  // 리로드
      })
      .catch(err => {
        console.error('Error deleting report:', err);
        alert('제보 삭제에 실패했습니다.');
      });
  };

  const handleLike = async (placeId) => {
    const likeCount = await getLikesCountAPI(placeId);
    setLikes(likeCount);
  };

  const fetchReports = () => {
    getMyPageReportAPI()
      .then(res => {
        if (res.length > 0) {
          setResponses(res);
        } else {
          setNoReports(true);
        }
      })
      .catch(err => console.error('Error fetching reports:', err));
  };

  return (
    <AccountContainer>
      <SharedHeader headerText="제보 내역"></SharedHeader>
      {noReports ? (
        <NoDataMessage>제보 내역이 없습니다.</NoDataMessage>
      ) : (
        <ReportContainer>
          {reports.map(report => (
            <ReportItem key={report.id} isOpen={openReportId === report.id}>
              <NewHeader>
                <ReportHeader isOpen={openReportId === report.id} onClick={() => { handleToggle(report.id); if (report.reportType === "SH") { handleLike(report.placeId); } }}>
                  <span>{report.address}</span>
                  <DropdownArrow>
                    <ArrowImg src={openReportId === report.id ? upButtonImg : bottomButtonImg} alt="토글" />
                  </DropdownArrow>
                </ReportHeader>
                <DelBox onClick={() => { handleDelete(report.id) }}>
                  <DelImg src={openReportId === report.id ? blackX : coloredX} alt="삭제"></DelImg>
                </DelBox>
              </NewHeader>
              <ReportDetail isOpen={openReportId === report.id}>
                <ReportContent>
                  {report.detail}
                </ReportContent>
                <DetailText>{report.description}</DetailText>
                <Status>
                  {report.rate && <CleanRateBox rate={report.rate} />}
                  <ButtonGroup>
                    {(report.reportType === "SM" && (report.isIndoor ? <ActionButton>실내</ActionButton> : <ActionButton>실외</ActionButton>))}
                    {(report.reportType === "SM" && (report.ashtray ? <ActionButton>재떨이 O</ActionButton> : <ActionButton>재떨이 X</ActionButton>))}
                    {report.reportType === "SH" && <LikeButton><img src={likeImg} alt="공감버튼"></img>누적 공감 {likes}개</LikeButton>}
                  </ButtonGroup>
                </Status>
              </ReportDetail>
            </ReportItem>
          ))}
        </ReportContainer>)}
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

const NoDataMessage = styled.div`
  display: flex;
  text-align: center; 
  margin-top: 45vh;
  font-size: 1.2rem; 
  font-weight: bold;
  color: #D9D9D9;
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  margin-top: 15vh;
  margin-bottom: 10vh;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
  border: 2px solid #272A30;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: ${({ isOpen }) => (isOpen ? '#FEFBBD' : '#272A30')}; 
  cursor: pointer;
`;

const NewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${({ isOpen }) => (isOpen ? '#272A30' : '#EDEDED')};
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0rem 1.5rem 1.5rem;
  font-weight: bold;
  color: ${({ isOpen }) => (isOpen ? '#272A30' : '#EDEDED')};
`;

const ReportContent = styled.div`
  font-size: 1rem;
`;

const DropdownArrow = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowImg = styled.img`
  width: 2rem;
`;

const DelBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
`;

const DelImg = styled.img`
  width: 1rem;
  height: 1rem;
`;

const ReportDetail = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '100vh' : '0')};
  margin: ${({ isOpen }) => (isOpen ? '0rem 1rem 1rem' : '0rem 1rem 0rem')};
  border-radius: 0.5rem;
  padding: ${({ isOpen }) => (isOpen ? '1rem' : '0rem 1rem 0rem')};
  overflow: hidden;
  transition: 0.25s ease-in-out; 
  color: #272A30;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1.2px solid #272A30;
  border-radius: 6px;
  padding: 0.2rem 0.8rem;
  font-weight: bold;
  font-size: 0.6rem;
  background-color: #FFFDE2;
  cursor: pointer;

  &:hover {
    background-color: #FFF100;
  }

  img {
    width: 1rem;
    margin-right: 0.2rem;
  }
`;

const LikeButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1.2px solid #272A30;
  border-radius: 6px;
  padding: 0.2rem 0.8rem;
  font-weight: bold;
  font-size: 0.6rem;
  background-color: #FFFDE2;

  cursor: pointer;

  img {
    width: 1rem;
    margin-right: 0.2rem;
  }
`;
