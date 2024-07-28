import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserImg from "../assets/free-icon-user-3686930.png";
import smokeImg from "../assets/free-icon-smoking-813800.png";

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

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    initializeMap();
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
            timeout: 5000,
          }
        );

        const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
        setMarkers(savedMarkers);
        savedMarkers.forEach((markerData) => {
          createMarker(
            map,
            new kakao.maps.LatLng(
              markerData.position.Ma,
              markerData.position.La
            ),
            markerData.title,
            smokeImg,
            markerData.address
          );
        });
      },
      (error) => {
        console.error("현재 위치를 가져오는 데 실패했습니다.", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  }

  const startReporting = () => {
    const map = mapInstance;
    const smokeImageSrc = smokeImg;
    const smokeImageSize = new kakao.maps.Size(24, 30);
    const smokeImageOption = { offset: new kakao.maps.Point(12, 15) };

    const smokeMarkerImage = new kakao.maps.MarkerImage(
      smokeImageSrc,
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

  function createMarker(map, position, title, img, address) {
    const smokeImageSrc = smokeImg;
    const smokeImageSize = new kakao.maps.Size(24, 30);
    const smokeImageOption = { offset: new kakao.maps.Point(12, 15) };

    const smokeMarkerImage = new kakao.maps.MarkerImage(
      smokeImageSrc,
      smokeImageSize,
      smokeImageOption
    );

    const marker = new kakao.maps.Marker({
      position,
      map,
      image: smokeMarkerImage,
    });

    kakao.maps.event.addListener(marker, "click", function () {
      setSelectedMarkerInfo({ title, img, address });
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
        img: smokeImg, // 항상 smokeImg를 사용합니다.
        address,
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
        smokeImg,
        address
      );

      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setNewMarker(null);
    setAddress("");
    setIsReporting(false);
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
        <InfoPanel>
          <CloseButtonBox>
            <CloseButton onClick={() => setSelectedMarkerInfo(null)}>
              닫기
            </CloseButton>
          </CloseButtonBox>
          <InfoBox>
            <Box>
              <h5>제보 흡연 구역</h5>
              <h3>주소</h3>
              <h5>{selectedMarkerInfo.address}</h5>
              <h4>{selectedMarkerInfo.title}</h4>
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
          <ModalContent>
            <h4>제보하기</h4>
            <Form>
              <h3>주소</h3>
              <div>{address}</div>
              <Label>
                제목:
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Label>
              {/* <Label>
                이미지 업로드:
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Label>
              {img && <ImagePreview src={img} alt="Preview" />} */}
              <ButtonBox>
                <Button onClick={handleSubmit}>제출</Button>
                <Button onClick={handleCloseModal}>취소</Button>
              </ButtonBox>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
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

  background: white;
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

const CloseButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Box = styled.div`
  flex: 1;
`;

const ImgBox = styled.div`
  flex: 1;
  img {
    width: 70%;
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
  bottom: 12%;
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
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background: #007bff;
  color: white;
  &:last-child {
    background: #dc3545;
  }
`;
