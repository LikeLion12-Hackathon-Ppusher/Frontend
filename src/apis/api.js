// src/services/api.js

import axios from 'axios';

// 기본 설정
const instance = axios.create({
  baseURL: 'https://bbuhackathon.p-e.kr',
});

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

const baseURL = 'https://bbuhackathon.p-e.kr';

// 마이페이지 API call
export const callMyPageAPI = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/oauth/user/mypage/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;  
  } catch (error) {
    console.error('마이페이지 GET 에러:', error);
    throw error;  
  }
};
export default instance;
