import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Redirection = () => {
    const code = window.location.search;
    // 아래는 oauth?code=뒷 부분만 가져올 때 코드
    // const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(process.env.REACT_APP_URL);

        axios.post(`https://kauth.kakao.com/oauth/token?${code}`).then((r) => {
            console.log(r.data);

            // 나중에 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 씀
            localStorage.setItem('name', r.data.user_name); // 일단 이름만 저장
            navigate('/home');
        });
    }, []);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;