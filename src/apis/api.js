// src/services/api.js
import axios from "axios";
// 기본 설정
const instance = axios.create({
  baseURL: "https://bbuhackathon.p-e.kr",
});
const baseURL = "https://bbuhackathon.p-e.kr";
// POST 로그아웃
export const logOut = async (token) => {
  try {
    const response = await instance.post(
      "/oauth/logout/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("로그아웃 에러:", error);
    throw error;
  }
};
// GET 흡연 구역 안내
export const getPlaceSmokingAPI = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/place/smoking/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("흡연 구역 안내:", response.data);
    const placeId = response.data.placeId;
    console.log("placeId:", placeId);
    return response.data;
  } catch (error) {
    console.error("GET 에러(place/smoking):", error);
    throw error;
  }
};
// GET 상세 흡연 구역 안내
export const getPlaceSmokingIDAPI = async (token, id) => {
  try {
    const response = await axios.get(`${baseURL}/place/smoking/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("상세 흡연 구역 안내:", response.data);
    // return response.data;
  } catch (error) {
    console.error("GET 에러(place/smoking/{id}):", error);
    throw error;
  }
};
// GET 사용자 정보
export const getMyPageAPI = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/oauth/user/mypage/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("GET 에러(mypage):", error);
    throw error;
  }
};
// PUT 사용자 유형
export const putUserTypeAPI = async (token, type) => {
  try {
    const response = await axios.put(
      `${baseURL}/oauth/user/mypage/type/`,
      {
        userType: type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("PUT 에러(type)", error);
    throw error;
  }
};
// 흡연자의 흡연구역 제보
export const smokerReportAPI = async (
  access_Token,
  reportUserType,
  userId,
  Lat,
  Lng,
  address,
  indoorOutdoor,
  hasAshtray,
  cleanlinessRating,
  title
) => {
  try {
    console.log(reportUserType);
    console.log(userId);
    console.log(Lat);
    console.log(Lng);
    console.log(address);
    console.log(title);
    console.log(indoorOutdoor);
    const response = await axios.post(
      `${baseURL}/report/`,
      {
        reportType: reportUserType,
        userId: userId,
        reportSmokingPlace: {
          latitude: Lat,
          longitude: Lng,
          name: title,
          address: address,
          isIndoor: indoorOutdoor,
          ashtray: hasAshtray,
          rate: cleanlinessRating,
        },
        description: title,
      },
      {
        headers: {
          Authorization: `Bearer ${access_Token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("흡연자 제보 에러", error);
    throw error;
  }
};
// 비흡연자의 흡연구역 제보
export const nonSmokerReportAPI = async (
  access_Token,
  reportUserType,
  userId,
  Lat,
  Lng,
  address,
  title
) => {
  try {
    console.log(reportUserType);
    console.log(userId);
    console.log(Lat);
    console.log(Lng);
    console.log(address);
    console.log(title);
    const response = await axios.post(
      `${baseURL}/report/`,
      {
        reportType: reportUserType,
        userId: userId,
        secondhandSmokingPlace: {
          latitude: Lat,
          longitude: Lng,
          name: title,
          address: address,
        },
        description: title,
      },
      {
        headers: {
          Authorization: `Bearer ${access_Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("비흡연자 제보 에러", error);
    throw error;
  }
};
// PUT 알림설정
export const putAlarmOptionAPI = async (token, opt) => {
  try {
    const response = await axios.put(
      `${baseURL}/oauth/user/mypage/alarm/`,
      {
        option: opt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("PUT 에러(alarm)", error);
    throw error;
  }
};

// GET 나의 제보 내역
export const getMyPageReportAPI = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${baseURL}/oauth/user/mypage/report/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('나의 제보 내역:', response.data);
    return response.data;  
  } catch (error) {
    console.error('GET 에러(mypage/report):', error);
    throw error;  
  }
};

// GET 나의 제보 상세 내역
export const getReportDetailAPI = async (reportId) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${baseURL}/oauth/user/mypage/report/${reportId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('나의 제보 상세 내역:', response.data);
    return response.data;  
  } catch (error) {
    console.error('GET 에러(mypage):', error);
    throw error;  
  }
};

// PUT 마이페이지 알림거리 설정
export const putMyPageDistAPI = async (token, dist) => {
  try {
    const response = await axios.put(
      `${baseURL}/oauth/user/mypage/distance/`,
      {
        distance: dist,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("PUT 에러(distance)", error);
    throw error;
  }
};

// PUT 마이페이지 시간 설정
export const putMyPageTimeAPI = async (token, tm) => {
  try {
    const response = await axios.put(
      `${baseURL}/oauth/user/mypage/time/`,
      {
        time: tm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("PUT 에러(time)", error);
    throw error;
  }
};

export default instance;