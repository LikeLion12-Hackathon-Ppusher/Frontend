import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
const NaverMap = () => {
  const mapRef = useRef(null); // 지도를 표시할 DOM 요소의 참조

  useEffect(() => {
    const { naver } = window; // 전역 window 객체에서 naver를 추출

    // 사용자 위치 접근 성공 시 지도와 마커를 초기화
    const initializeMap = (position) => {
      const { latitude, longitude } = position.coords;
      if (mapRef.current && naver) {
        const location = new naver.maps.LatLng(latitude, longitude);
        const map = new naver.maps.Map(mapRef.current, {
          center: location,
          zoom: 20,
          minZoom: 14,
          zoomControl: true,
          mapTypeControl: true,
          zoomControlOptions: {
            // 줌 컨트롤의 위치를 우측 상단으로 배치함
            position: naver.maps.Position.TOP_RIGHT,
          },
          // 지도 데이터 저작권 컨트롤 표시 여부
          mapDataControl: false,
        });
        new naver.maps.Marker({
          position: location,
          map,
        });
      }
    };

    // 위치 접근 실패 시 서울시청을 중심으로 지도 설정
    const handleError = () => {
      const defaultLat = 37.5666103;
      const defaultLng = 126.9783882;
      if (mapRef.current && naver) {
        const defaultLocation = new naver.maps.LatLng(defaultLat, defaultLng);
        const map = new naver.maps.Map(mapRef.current, {
          center: defaultLocation,
          zoom: 17,
        });
        new naver.maps.Marker({
          position: defaultLocation,
          map,
        });
      }
    };

    // 사용자의 현재 위치를 요청
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initializeMap, handleError);
    }
  }, []);

  return <MapContainer ref={mapRef} />;
};

export default NaverMap;

const MapContainer = styled.div`
  width: 500px;
  height: 500px;
`;
