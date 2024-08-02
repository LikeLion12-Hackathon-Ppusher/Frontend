// // NoSmokingZoneChecker.jsx
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import clustererMarkerImg from "../assets/투명.png";

// const { kakao } = window;

// const NoSmokingZoneChecker = ({ mapInstance }) => {
//   const [noSmokingZones, setNoSmokingZones] = useState([]);
//   const [showNoSmokingModal, setShowNoSmokingModal] = useState(false);

//   useEffect(() => {
//     if (!mapInstance) return;

//     const fetchNoSmokingZones = async () => {
//       //여기서 나라 지정 흡연장소 가져오기
//       const publicSmokingZone = await axios.get(
//         "https://bbuhackathon.p-e.kr/place/nosmoking"
//       );

//       console.log(publicSmokingZone);

//       setNoSmokingZones(publicSmokingZone);

//       // 원을 저장할 배열
//       const circles = [];

//       // 금연 구역 위치 일단 제보된 흡연장소로 시험 테스트
//       publicSmokingZone.data.forEach((markerData) => {
//         var circle = new kakao.maps.Circle({
//           center: new kakao.maps.LatLng(
//             markerData.latitude,
//             markerData.longitude
//           ), // 원의 중심좌표 입니다
//           radius: 50, // 미터 단위의 원의 반지름입니다
//           strokeWeight: 1.5, // 선의 두께입니다
//           strokeColor: "red", // 선의 색깔입니다
//           strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
//           strokeStyle: "", // 선의 스타일 입니다
//           fillColor: "red", // 채우기 색깔입니다
//           fillOpacity: 0.3, // 채우기 불투명도 입니다
//         });

//         // 지도에 원을 표시합니다
//         circle.setMap(mapInstance);

//         // 배열에 원을 추가합니다
//         circles.push(circle);
//       });

//       // 지도 레벨 변경 이벤트를 감지합니다
//       kakao.maps.event.addListener(mapInstance, "zoom_changed", () => {
//         const level = mapInstance.getLevel();

//         // 특정 레벨 이하에서는 원을 숨기고, 그 이상에서는 원을 표시합니다
//         circles.forEach((circle) => {
//           if (level > 4) {
//             // 레벨 4 이상일 때 숨기기
//             circle.setMap(null);
//           } else {
//             circle.setMap(mapInstance);
//           }
//         });
//       });

//       const clusterer = new kakao.maps.MarkerClusterer({
//         map: mapInstance, // 마커들을 클러스터로 관리하고 표시할 지도 객체
//         averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
//         minLevel: 5, // 클러스터 할 최소 지도 레벨
//       });

//       // 클러스터용 마커 (투명 이미지 + 크기를 0으로 설정)
//       const nonSmokeZoneimageSrc = clustererMarkerImg;
//       const nonSmokeZoneimageSize = new kakao.maps.Size(0, 0);
//       const nonSmokeZoneimageOption = { offset: new kakao.maps.Point(0, 0) };

//       const nonSmokeZoneMarkerImage = new kakao.maps.MarkerImage(
//         nonSmokeZoneimageSrc,
//         nonSmokeZoneimageSize,
//         nonSmokeZoneimageOption
//       );

//       const newMarkers = publicSmokingZone.data.map((markerData) => {
//         return new kakao.maps.Marker({
//           position: new kakao.maps.LatLng(
//             markerData.latitude,
//             markerData.longitude
//           ),
//           image: nonSmokeZoneMarkerImage,
//         });
//       });

//       clusterer.addMarkers(newMarkers);
//     };

//     fetchNoSmokingZones();

//     const handlePositionUpdate = (position) => {
//       const { latitude, longitude } = position.coords;
//       const userLatLng = new kakao.maps.LatLng(latitude, longitude);
//       checkUserInNoSmokingZone(userLatLng);
//     };

//     const checkUserInNoSmokingZone = (userLatLng) => {
//       noSmokingZones.data.forEach((zone) => {
//         const zoneLatLng = new kakao.maps.LatLng(zone.latitude, zone.longitude);
//         const distance = kakao.maps.Util.getDistance(userLatLng, zoneLatLng);
//         if (distance <= 30) {
//           setShowNoSmokingModal(true);
//         }
//       });
//     };
//   }, [mapInstance, noSmokingZones]);

//   const handleCloseModal = () => {
//     setShowNoSmokingModal(false);
//   };

//   return (
//     <>
//       {showNoSmokingModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>금연구역 안내</h2>
//             <p>현재 금연구역에 위치하고 있습니다. 금연구역을 존중해 주세요.</p>
//             <button onClick={handleCloseModal}>닫기</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NoSmokingZoneChecker;
