import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import UserImg from "../assets/UserIcon.png";
import smokeImg from "../assets/제보흡연구역.png";
import smokeImg2 from "../assets/상습흡연구역.png";
import reportImg from "../assets/logo.png";
import { ThemeColorContext } from "../Context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const { kakao } = window;

const Map = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const reportingMarkerRef = useRef(null);

  // 지도 객체 상태 추가
  // 여걸로 modal창의 handleSumbit에서의 마커 생성함수에 mapInstance를 넣는다
  // mapInstance가 그냥 카카오 맵임
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  // 모달창 true면 보이게
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [title, setTitle] = useState("");
  // 지도 클릭한 위치 주소 변환 상태 변수
  const [address, setAddress] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  const [showThankYouModal, setShowThankYouModal] = useState(false); // 감사 모달 상태 추가

  const location = useLocation();

  const navigate = useNavigate();

  const [userType, setUserType] = useState(
    location.state?.userType || "smoker"
  ); // 상태로 관리
  // 이후 로그인 api와 정보를 저장할 수 있는 경우에는 다르게 useEffect에다가 axios.get으로 가져오거나 애초에
  // 로그인 할때 받은 res 데이터 정보에 담겨있는 option에서의 값을 여기다가 갔다놓자 (로그인 했을 때 받은 데이터 객체를 어디다가 저장해야 됨)

  const [hasAshtray, setHasAshtray] = useState("");
  const [indoorOutdoor, setIndoorOutdoor] = useState(""); // 실내외 구분 상태 추가

  // Home이 최상위라 home에서 바꿔야 한다
  // const [mode, setMode] = useState(context.nonSmokeTheme);
  const mode = useContext(ThemeColorContext);

  useEffect(() => {
    initializeMap();

    console.log(mode);
    console.log(userType);
  }, []);

  //  location.search가 변경될 때마다 실행, location.search는 URL의 쿼리 문자열 부분(?report=ture) 부분
  useEffect(() => {
    console.log(location);
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("report") === "true") {
      setIsReporting(true);
    } else {
      setIsReporting(false);
    }

    // 현위치 누르면 밑에 함수 실행 그리고 새로고침 ㅠ
    if (queryParams.get("currentLocation") === "true") {
      moveToCurrentLocation();
    }

    console.log(userType);
  }, [location.search]);

  // isReporting이 true이고 mapInstance가 존재하면 startReporting 함수를 호출하여 제보기능 호출
  useEffect(() => {
    if (isReporting && mapInstance) {
      startReporting();
    }
  }, [isReporting, mapInstance]);

  function initializeMap() {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.4507, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    setMapInstance(map);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLatLng = new kakao.maps.LatLng(latitude, longitude);

        map.setCenter(userLatLng);

        const imageSrc = UserImg;
        const imageSize = new kakao.maps.Size(24, 30);
        const imageOption = { offset: new kakao.maps.Point(12, 15) };

        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        markerRef.current = new kakao.maps.Marker({
          position: userLatLng,
          image: markerImage,
          map,
        });

        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLatLng = new kakao.maps.LatLng(latitude, longitude);

            if (markerRef.current) {
              markerRef.current.setPosition(newLatLng);
            }

            map.setCenter(newLatLng);
          },
          (error) => {
            console.error("위치 정보를 가져오는 데 실패했습니다.", error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          }
        );

        const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
        setMarkers(savedMarkers);
        console.log(savedMarkers);
        savedMarkers.forEach((markerData) => {
          // const markerImageSrc =
          //   markerData.userType === "smoker" ? smokeImg : smokeImg2;
          createMarker(
            map,
            new kakao.maps.LatLng(
              markerData.position.Ma,
              markerData.position.La
            ),
            markerData.title,
            markerData.img,
            markerData.address,
            markerData.userType,
            markerData.hasAshtray,
            markerData.indoorOutdoor
          );
        });
      },
      (error) => {
        console.error("현재 위치를 가져오는 데 실패했습니다.", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  }

  const moveToCurrentLocation = () => {
    window.location.reload();
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     const userLatLng = new kakao.maps.LatLng(latitude, longitude);
    //     mapInstance.setCenter(userLatLng);
    //   },
    //   (error) => {
    //     console.error("현재 위치를 가져오는 데 실패했습니다.", error);
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     maximumAge: 0,
    //     timeout: 10000,
    //   }
    // );
  };

  const startReporting = () => {
    const map = mapInstance;
    const smokeImageSrc = userType === "smoker" ? smokeImg : smokeImg2;
    const smokeImageSize = new kakao.maps.Size(24, 30);
    const smokeImageOption = { offset: new kakao.maps.Point(12, 15) };

    const smokeMarkerImage = new kakao.maps.MarkerImage(
      reportImg,
      smokeImageSize,
      smokeImageOption
    );

    const reportingMarker = new kakao.maps.Marker({
      position: map.getCenter(),
      image: smokeMarkerImage,
      map,
    });

    reportingMarkerRef.current = reportingMarker;
    setNewMarker(reportingMarker.getPosition());
    getAddressFromCoords(reportingMarker.getPosition());

    kakao.maps.event.addListener(map, "dragend", function () {
      const latlng = map.getCenter();
      reportingMarker.setPosition(latlng);
      getAddressFromCoords(latlng);
      setNewMarker(latlng);
    });

    setIsModalOpen(true);
  };

  const getAddressFromCoords = (latlng) => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(
      latlng.getLng(),
      latlng.getLat(),
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const detailAddr = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;
          setAddress(detailAddr);
        }
      }
    );
  };

  function createMarker(
    map,
    position,
    title,
    img,
    address,
    userType,
    hasAshtray = false, // 전달된 인수가 없을 떄 기본값
    indoorOutdoor = "" // 전달된 인수가 없을 떄 기본값
  ) {
    const smokeImageSize = new kakao.maps.Size(16, 16);
    const smokeImageOption = { offset: new kakao.maps.Point(8, 8) };

    const smokeMarkerImage = new kakao.maps.MarkerImage(
      img,
      smokeImageSize,
      smokeImageOption
    );

    const marker = new kakao.maps.Marker({
      position,
      map,
      image: smokeMarkerImage,
    });

    kakao.maps.event.addListener(marker, "click", function () {
      setSelectedMarkerInfo({
        title,
        img,
        address,
        userType,
        hasAshtray,
        indoorOutdoor,
      });
    });

    return marker;
  }

  // 제보 제출
  const handleSubmit = () => {
    if (newMarker && title && address) {
      const newMarkerData = {
        position: {
          Ma: newMarker.getLat(),
          La: newMarker.getLng(),
        },
        title,
        img: userType === "smoker" ? smokeImg : smokeImg2, // 마커의 이미지 설정 (기본값은 smokeImg)
        address,
        userType,
        ...(userType === "smoker" && {
          hasAshtray,
          indoorOutdoor,
        }),
      };

      setMarkers((prev) => {
        const updatedMarkers = [...prev, newMarkerData];
        localStorage.setItem("markers", JSON.stringify(updatedMarkers));
        return updatedMarkers;
      });

      createMarker(
        mapInstance,
        new kakao.maps.LatLng(newMarker.getLat(), newMarker.getLng()),
        title,
        userType === "smoker" ? smokeImg : smokeImg2,
        address,
        userType,
        hasAshtray,
        indoorOutdoor
      );

      handleCloseModal();

      // 감사 모달 창 설정
      setShowThankYouModal(true); // 감사 모달 상태 변경

      setTimeout(() => {
        setShowThankYouModal(false); // 2초 후 감사 모달 숨기기
      }, 2000);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setNewMarker(null);
    setAddress("");
    setIsReporting(false);
    setHasAshtray(false);

    if (reportingMarkerRef.current) {
      reportingMarkerRef.current.setMap(null); // 마커를 지도에서 제거
      reportingMarkerRef.current = null; // 레퍼런스를 초기화
    }
    navigate("/home/map");
  };

  return (
    <Container>
      <MapDiv ref={mapRef}></MapDiv>
      {selectedMarkerInfo && (
        <InfoPanel
          infoboxcolor={mode.infoBoxColor}
          infofontbordercolor={mode.infoFontBorderColor}
        >
          <CloseButtonBox>
            <CloseButton
              infofontbordercolor={mode.infoFontBorderColor}
              onClick={() => setSelectedMarkerInfo(null)}
            >
              닫기
            </CloseButton>
          </CloseButtonBox>
          <InfoBox>
            <Box>
              <h5>제보 흡연 구역</h5>
              <h3>주소</h3>
              <h5>{selectedMarkerInfo.address}</h5>
              <h4>{selectedMarkerInfo.title}</h4>
              {selectedMarkerInfo.userType === "smoker" && (
                <PlusInfo>
                  <InfosmokerBox infofontbordercolor={mode.infoFontBorderColor}>
                    재떨이
                    {selectedMarkerInfo.hasAshtray}
                  </InfosmokerBox>
                  <InfosmokerBox infofontbordercolor={mode.infoFontBorderColor}>
                    {selectedMarkerInfo.indoorOutdoor}
                  </InfosmokerBox>
                </PlusInfo>
              )}
            </Box>
            <ImgBox>
              {selectedMarkerInfo.img && (
                <img src={selectedMarkerInfo.img} alt="Uploaded" />
              )}
            </ImgBox>
          </InfoBox>
          <LikeButton onClick={() => alert("좋아요 클릭!")}>좋아요</LikeButton>
        </InfoPanel>
      )}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent
            modalboxcolor={mode.reportBackground}
            fontcolor={mode.font}
          >
            <h4>제보하기</h4>
            <Form>
              <h3>주소</h3>
              <h5>{address}</h5>

              {/* <Label>
                이미지 업로드:
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Label>
              {img && <ImagePreview src={img} alt="Preview" />} */}
              {userType === "smoker" && (
                <ModalBtnBox>
                  <Label>
                    *재떨이
                    <Button
                      active={hasAshtray === "O"}
                      onClick={() => setHasAshtray("O")}
                    >
                      유
                    </Button>
                    <Button
                      active={hasAshtray === "X"}
                      onClick={() => setHasAshtray("X")}
                    >
                      무
                    </Button>
                  </Label>
                  <Label>
                    *실내외
                    <Button
                      active={indoorOutdoor === "실내"}
                      onClick={() => setIndoorOutdoor("실내")}
                    >
                      실내
                    </Button>
                    <Button
                      active={indoorOutdoor === "실외"}
                      onClick={() => setIndoorOutdoor("실외")}
                    >
                      실외
                    </Button>
                  </Label>
                </ModalBtnBox>
              )}

              <TextConatiner>
                <Input
                  type="text"
                  value={title}
                  placeholder="상세 위치(최대 20자)"
                  placeholdercolor={mode.placeholder}
                  textboxcolor={mode.reportTextBox}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={20}
                />
              </TextConatiner>
              <ButtonBox>
                <Button onClick={handleSubmit}>제출</Button>
                <Button onClick={handleCloseModal}>취소</Button>
              </ButtonBox>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

      <ThankYouModal isvisible={showThankYouModal}>
        <IconBox>
          <FontAwesomeIcon icon={faThumbsUp} size="3x" />
        </IconBox>
        {userType === "smoker" && (
          <>
            <h3>흡연구역 제보 완료</h3>
            <div>
              비흡연자들의 간접흡연 위험을 줄이기 위해
              <br />
              지정된 흡연구역에서 흡연해주세요:&#41;
            </div>
          </>
        )}
        {userType === "nonSmoker" && (
          <>
            <h3>상습 흡연구역 제보 완료</h3>
            <div>간접흡연 방지를 위해 힘써주셔서 감사합니다!</div>
          </>
        )}
      </ThankYouModal>
    </Container>
  );
};

export default Map;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const InfoPanel = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: 80%;
  opacity: 95%;
  background-color: ${(props) => props.infoboxcolor};
  color: ${(props) => props.infofontbordercolor};
  border-top: 1px solid #ccc;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 5%;

  img {
    object-fit: contain;
    width: 200px;
    height: 150px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlusInfo = styled.div`
  display: flex;
  align-items: center;
`;

const InfosmokerBox = styled.div`
  border: 2px solid ${(props) => props.infofontbordercolor};
  color: ${(props) => props.infofontbordercolor};
  border-radius: 0.2rem;
  padding: 0.2rem 0.3rem;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const CloseButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.infofontbordercolor};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const Box = styled.div`
  text-align: start;
  flex: 1;
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`;

const ImgBox = styled.div`
  flex: 1;
  img {
    width: 50%;
    height: auto;
  }
`;

const LikeButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: green;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const ModalOverlay = styled.div`
  position: absolute;
  bottom: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  h4,
  h3,
  h5,
  h6 {
    margin: 0;
  }
  h4 {
    margin-bottom: 0.2rem;
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.modalboxcolor};
  color: ${(props) => props.fontcolor};

  @media (max-width: 600px) {
    width: 70%;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  // margin-bottom: 1rem;
  font-weight: bold;
`;
const TextConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 95%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${(props) => props.textboxcolor};

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.placeholdercolor};
  }
`;

const ModalBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.4rem 0;
`;

const ThankYouModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  border-radius: 0.5rem;
  text-align: center;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  opacity: ${({ isvisible }) => (isvisible ? "1" : "0")};
  visibility: ${({ isvisible }) => (isvisible ? "visible" : "hidden")};
  display: block;
`;

const IconBox = styled.div`
  display: flex;
  width: 20%;
  margin: 0 auto;
  justify-content: center;
  background-color: #f7f152;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  border: 2px solid black;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: ${(props) => (props.active ? "#F7F152" : "#252424")};
  color: ${(props) => (props.active ? "#000000" : "#F7F152")};
  border: 2px solid #f7f152;
  padding: 0.1rem 0.5em;
  margin: 0rem 0.3rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#c3bf4e" : "#626262")};
  }
`;
