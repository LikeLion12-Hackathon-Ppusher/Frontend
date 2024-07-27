import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserImg from "../free-icon-user-3686930.png";
import { renderToString } from "react-dom/server";
import ReactDOM from "react-dom";

// 이유는 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어가게 됩니다.
// 그런데 함수형 컴포넌트에서는 이를 바로 인식하지 못한다고 합니다.
// 그렇기 때문에 코드 상단에 const { kakao } = window를 작성하여 함수형 컴포넌트에 인지 시키고 window에서 kakao객체를 뽑아서 사용하면 됩니다.
const { kakao } = window;

const Map = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [markers, setMarkers] = useState([]);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newMarker, setNewMarker] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    initializeMap();

    function initializeMap() {
      const container = mapRef.current; // <--- mapRef로 요소를 참조합니다.
      const options = {
        center: new kakao.maps.LatLng(33.4507, 126.570667), // 초기 좌표 설정
        level: 3,
      };

      const map = new kakao.maps.Map(container, options); // 지도를 생성

      // 사용자 위치를 나타내는 아이콘 설정
      const imageSrc = UserImg; // import한 이미지 사용
      const imageSize = new kakao.maps.Size(20, 25); // 아이콘의 크기
      const imageOption = { offset: new kakao.maps.Point(10, 12) }; // 아이콘의 기준 위치 위의 아이콘의 크기에 따라 변동하자

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 초기 마커 생성
      markerRef.current = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(33.4507, 126.570667), // 초기 마커 위치
        image: markerImage,
        map: map,
      });

      // 위치 추적
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLatLng = new kakao.maps.LatLng(latitude, longitude);

          // 마커 실시간 위치 업데이트
          if (markerRef.current) {
            markerRef.current.setPosition(newLatLng);
          }

          // 지도 중심 업데이트
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

      // 저장된 마커 불러오기
      const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
      setMarkers(savedMarkers);
      savedMarkers.forEach((markerData) => {
        createMarker(
          map,
          new kakao.maps.LatLng(markerData.position.Ma, markerData.position.La),
          markerData.title,
          markerData.image
        );
      });

      // 클릭 했을때 마커 생성

      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        const latlng = mouseEvent.latLng;

        setNewMarker(latlng);
        setIsModalOpen(true);

        // 에라이
        const newMarker = {
          position: latlng,
          title,
          image,
        };

        createMarker(map, latlng, title, image);
        setMarkers((prev) => {
          const updatedMarkers = [...prev, newMarker];
          localStorage.setItem("markers", JSON.stringify(updatedMarkers));
          return updatedMarkers;
        });
      });
    }

    function createMarker(map, position, title, image) {
      const marker = new kakao.maps.Marker({
        position,
        map,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        setSelectedMarkerInfo({ title, image });
      });

      return marker;
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setImage("");
    setNewMarker(null);
  };

  return (
    <Container>
      <MapDiv ref={mapRef}></MapDiv>
      {selectedMarkerInfo && (
        <InfoPanel>
          <CloseButton onClick={() => setSelectedMarkerInfo(null)}>
            닫기
          </CloseButton>
          <h4>{selectedMarkerInfo.title}</h4>
          <img src={selectedMarkerInfo.image} alt={selectedMarkerInfo.title} />
          <LikeButton>좋아요</LikeButton>
        </InfoPanel>
      )}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>마커 정보 입력</h2>
            <Form>
              <label>
                장소 설명:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                이미지 URL:
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </label>
            </Form>
            <ButtonContainer>
              {/* <ModalButton onClick={handleSubmit}>확인</ModalButton> */}
              <ModalButton onClick={handleCloseModal}>취소</ModalButton>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Map;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const MapDiv = styled.div`
  width: 600px;
  height: 100vh;
`;

const InfoPanel = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: 100%; // 맵의 크기에 맞춰서 중앙으로 나타내기 위해 너비를 조정합니다.
  height: 200px;
  background: white;
  border-top: 1px solid #ccc;
  text-align: center;

  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  img {
    width: 100px;
    height: 100px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const LikeButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = styled.div`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const Form = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;
