// src/utils/distanceUtils.js

// 거리 계산 함수 (Haversine 공식)
export const getDistance = (lat1, lon1, lat2, lon2) => {
  // 디버깅 로그 추가
  // console.log("lat1:", lat1, "lon1:", lon1, "lat2:", lat2, "lon2:", lon2);

  const R = 6371000; // 지구의 반경 (m)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  // 디버깅 로그 추가
  // console.log("dLat:", dLat, "dLon:", dLon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // 디버깅 로그 추가
  // console.log("a:", a);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 디버깅 로그 추가
  // console.log("c:", c);

  const d = R * c;
  // console.log("Distance:", d);

  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
