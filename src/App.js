import "./App.css";
import styled from "styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Redirection from "./pages/Redirection";
import KakaoMap from "./pages/KakaoMap";
import Mypage from "./pages/Mypage";

function App() {
  return (
    <AppDom>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* 초기 경로를 /main으로 리다이렉트 */}
        <Route path="/login" element={<Login></Login>}></Route>
        {/* http://localhost:3000/oauth 에서 받은 인가코드를 백엔드에 전달할 로직이 작성된 Redirection 페이지로 이동 */}
        <Route path="/oauth" element={<Redirection />} />
        <Route path="/home/*" element={<Home></Home>}>
          <Route path="kakao" element={<KakaoMap></KakaoMap>}></Route>
          <Route path="mypage" element={<Mypage></Mypage>}></Route>
        </Route>
      </Routes>
    </AppDom>
  );
}

export default App;

const AppDom = styled.div`
  width: 600px;
  height: 100vh;
  margin: 0 auto;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
