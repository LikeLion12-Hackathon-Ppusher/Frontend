import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import UserImg from "../free-icon-user-3686930.png";

const { kakao } = window;

const Map = () => {
  // 지도와 마커를 참조하기 위한 useRef 훅
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // 지도 객체 상태 추가
  // 여걸로 modal창의 handleSumbit에서의 마커 생성함수에 mapInstance를 넣는다
  const [mapInstance, setMapInstance] = useState(null);

  const [markers, setMarkers] = useState([]);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);

  // 모달창 true면 보이게
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newMarker, setNewMarker] = useState(null);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  // useEffect로 렌더링 최초 1회 실행
  useEffect(() => {
    initializeMap();
  }, []);

  // 초기 지도 생성 함수
  function initializeMap() {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.4507, 126.570667),
      level: 3,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    setMapInstance(map);

    // 사용자 위치를 나타내는 아이콘 설정
    const imageSrc = UserImg; // import한 이미지 사용
    const imageSize = new kakao.maps.Size(24, 30); // 아이콘의 크기
    const imageOption = { offset: new kakao.maps.Point(12, 15) }; // 아이콘의 기준 위치 위의 아이콘의 크기에 따라 변동하자

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 맨 처음 마커 위치 설정(제주도, 이미지는 유저 이미지(아이콘))
    markerRef.current = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(33.4507, 126.570667),
      image: markerImage,
      map,
    });

    // 사용자의 위치추적
    navigator.geolocation.watchPosition(
      (position) => {
        // position 객체에 위도, 경도 존재
        const { latitude, longitude } = position.coords;
        const newLatLng = new kakao.maps.LatLng(latitude, longitude);

        // 마커(사용자 아이콘)이 존재하는 경우 그 아이콘의 위치를 업데이트 한다(이동이 있을경우 이동하겠지?)
        if (markerRef.current) {
          markerRef.current.setPosition(newLatLng); // 위치 업데이트
        }

        // 새로운 newLatLng를 가져오면 이걸 통해 map의 위치를 바꿈
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

    // 로컬스토리지에 있는 마커 데이터를 가져와 지도에 추가한다
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
    setMarkers(savedMarkers);
    savedMarkers.forEach((markerData) => {
      createMarker(
        map,
        new kakao.maps.LatLng(markerData.position.Ma, markerData.position.La),
        markerData.title,
        markerData.img
      );
    });

    console.log(map);

    // 지도를 클릭했을 때 새로운 마커를 추가할 수 있도록 설정
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;

      // {La: 126.88766982662986, Ma: 37.49129582020366} 와 같이 반환
      console.log(latlng);

      // 위도, 경도 저장
      setNewMarker(latlng);
      // 모달창 오픈
      setIsModalOpen(true);
    });
  }

  // 새 마커를 지도에 추가하는 함수
  function createMarker(map, position, title, img) {
    const smokeImageSrc =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69MQZEYC0jAcCQ4e3NXvcVeLR9e9rUbya7w&s";
    const smokeImageSize = new kakao.maps.Size(24, 30); // 아이콘의 크기
    const somkeImageOption = { offset: new kakao.maps.Point(12, 15) }; // 아이콘의 기준 위치 위의 아이콘의 크기에 따라 변동하자

    const smokeMarkerImage = new kakao.maps.MarkerImage(
      smokeImageSrc,
      smokeImageSize,
      somkeImageOption
    );

    const marker = new kakao.maps.Marker({
      position,
      map,
      image: smokeMarkerImage,
    });

    // 마커 클릭 시 마커 정보를 보여주는 이벤트 리스너 추가
    kakao.maps.event.addListener(marker, "click", function () {
      setSelectedMarkerInfo({ title, img });
    });

    return marker;
  }

  // 모달에서 마커 정보를 제출할 때 호출되는 함수
  const handleSubmit = () => {
    // setTitle은 잘 작동된다, newMarker의 위치 정보(경도,위도)도 저장됨
    console.log(title);
    console.log(newMarker);
    console.log(newMarker.getLat());

    console.log(img);

    if (newMarker && title) {
      const newMarkerData = {
        position: {
          Ma: newMarker.getLat(),
          La: newMarker.getLng(),
        },
        title,
        img,
      };

      setMarkers((prev) => {
        const updatedMarkers = [...prev, newMarkerData];
        localStorage.setItem("markers", JSON.stringify(updatedMarkers));
        return updatedMarkers;
      });

      createMarker(
        mapInstance,
        new kakao.maps.LatLng(newMarker.getLat(), newMarker.getLng()),
        title
      );

      // 이게 있으면 모달창으로 마커 생성하면 화면에 바로 보이므로 일단 없애자
      // setSelectedMarkerInfo({ title });

      handleCloseModal();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result); // 이미지 URL을 상태에 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
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
          {selectedMarkerInfo.img && (
            <img src={selectedMarkerInfo.img} alt="Marker" />
          )}
          <LikeButton>좋아요</LikeButton>
        </InfoPanel>
      )}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>흡연 장소</h2>
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
                사진:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </Form>
            <ButtonContainer>
              <ModalButton onClick={handleSubmit}>확인</ModalButton>
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
  width: 100%;
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
