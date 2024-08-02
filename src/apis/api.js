// src/services/api.js

import axios from 'axios';

// 기본 설정
const instance = axios.create({
  baseURL: 'https://bbuhackathon.p-e.kr',
});

const baseURL = 'https://bbuhackathon.p-e.kr';

// 로그아웃 API 호출
export const logOut = async (token) => {
  try {
    const response = await instance.post('/oauth/logout/', {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error('로그아웃 에러:', error);
    throw error;
  }
};

// GET 사용자 정보
export const getMyPageAPI = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/oauth/user/mypage/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;  
  } catch (error) {
    console.error('GET 에러(mypage):', error);
    throw error;  
  }
};

// PUT 사용자 유형
export const putUserTypeAPI = async (token, type) => {
  try {
    const response = await axios.put(`${baseURL}/oauth/user/mypage/type/`, {
      userType: type
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;  
  } catch (error) {
    console.error('PUT 에러(type)', error);
    throw error;  
  }
};

// PUT 알림설정
export const putAlarmOptionAPI = async (token, opt) => {
  try {
    const response = await axios.put(`${baseURL}/oauth/user/mypage/alarm/`, {
      option: opt
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;  
  } catch (error) {
    console.error('PUT 에러(alarm)', error);
    throw error;  
  }
};

export default instance;




