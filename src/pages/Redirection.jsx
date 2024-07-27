import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Redirection = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    console.log(process.env.REACT_APP_URL);

    const fnGetKakaoOauthToken = async () => {
      const makeFormData = (params) => {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
          searchParams.append(key, params[key]);
        });
        return searchParams;
      };

      try {
        const res = await axios({
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          url: 'https://kauth.kakao.com/oauth/token',
          data: makeFormData({
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_REST_API_KEY,
            redirect_uri: process.env.REACT_APP_REDIRECT_URL,
            code
          })
        });

        // localStorage에 accessToken 저장
        localStorage.setItem('kakaoAccessToken', res.data.access_token);
        navigate('/home');
      } catch (err) {
        console.warn(err);
      }
    };

    fnGetKakaoOauthToken(); // Don't forget to call the function
  }, [navigate, code]);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
