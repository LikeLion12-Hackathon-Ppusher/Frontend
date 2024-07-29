import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Redirection = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");
  console.log(code);

  useEffect(() => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const REDIRECT_URI_LOCAL = process.env.REACT_APP_REDIRECT_URL_LOCAL;
    const REDIRECT_URI_PRODUCTION = process.env.REACT_APP_REDIRECT_URL_PRODUCTION;

    // 현재 URL이 localhost인 경우 로컬 리다이렉트 URI를 사용
    const REDIRECT_URI =
      window.location.hostname === "localhost"
        ? REDIRECT_URI_LOCAL
        : REDIRECT_URI_PRODUCTION;

    console.log("Redirect URL:", REDIRECT_URI);
    console.log("REST API Key:", REST_API_KEY);
    console.log("Client Secret:", CLIENT_SECRET);

    const url = 'http://bbuhackathon.p-e.kr';

    const fnGetKakaoOauthToken = async () => {
      const makeFormData = (params) => {
        const searchParams = new URLSearchParams();

        Object.keys(params).forEach((key) => {
          searchParams.append(key, params[key]);
        });

        console.log(searchParams);
        return searchParams;
      };

      try {
        // const res = await axios.post(url, {
        //   authorizationCode: code,
        // },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
        // console.log(res);

        const res = await axios({
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          url: "https://kauth.kakao.com/oauth/token",
          data: makeFormData({
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_REST_API_KEY,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            code,
          }),
        });

        // localStorage에 accessToken 저장
        localStorage.setItem("kakaoAccessToken", res.data.access_token);
        navigate("/home");
      } catch (err) {
        console.warn(err);
      }
    };

    fnGetKakaoOauthToken();
  }, [navigate, code]);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
