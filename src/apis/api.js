// src/services/api.js

import axios from 'axios';

// 기본 설정
const instance = axios.create({
  baseURL: 'https://bbuhackathon.p-e.kr:8000', // API의 기본 URL
  timeout: 1000, // 요청 시간 초과 설정
  headers: { 'Content-Type': 'application/json' },
});

// 로그아웃 API 호출
export const logOut = async (token) => {
  try {
    const response = await instance.post('/oauth/logout/', { token });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// 데이터 가져오기 예시
export const fetchData = async () => {
  try {
    const response = await instance.get('/data');
    return response.data;
  } catch (error) {
    console.error('Fetch data error:', error);
    throw error;
    }
};

// 다른 API 호출 추가 가능

export default instance;
