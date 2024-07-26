import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import UserImg from "../free-icon-user-3686930.png";

// 이유는 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어가게 됩니다.
// 그런데 함수형 컴포넌트에서는 이를 바로 인식하지 못한다고 합니다.
// 그렇기 때문에 코드 상단에 const { kakao } = window를 작성하여 함수형 컴포넌트에 인지 시키고 window에서 kakao객체를 뽑아서 사용하면 됩니다.
const { kakao } = window;

const Map = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

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

          // 마커 위치 업데이트
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
    }
  }, []);

  return <MapDiv ref={mapRef}></MapDiv>; // ref로 요소를 참조합니다.
};

export default Map;

const MapDiv = styled.div`
  width: 500px;
  height: 400px;
`;
