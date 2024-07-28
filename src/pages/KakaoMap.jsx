import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import markerIcon from "../assets/marker.png";

const KakaoMap = () => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const [isReporting, setIsReporting] = useState(false);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "Geolocation을 사용할 수 없어요.",
        isLoading: false,
      }));
    }
  }, []);

  const handleMapClick = (target, mouseEvent) => {
    if (isReporting) {
      const { latLng } = mouseEvent;
      setMarkers([...markers, { lat: latLng.getLat(), lng: latLng.getLng() }]);
      setIsReporting(false);
    }
  };

  return (
    <Container>
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "calc(100vh - 200px)",
          cursor: isReporting ? `url(${markerIcon}), auto` : "default",
        }}
        level={3}
        onClick={handleMapClick}
      >
        <MapMarker
          position={state.center}
          image={{
            src: "https://cdn-icons-png.flaticon.com/128/7124/7124723.png",
            size: {
              width: 50,
              height: 50,
            },
          }}
        />
        {markers.map((marker, index) => (
          <MapMarker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            draggable={true}
          />
        ))}
      </Map>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button onClick={() => setIsReporting(true)}>제보하기</button>
      </div>
    </Container>
  );
};

export default KakaoMap;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
