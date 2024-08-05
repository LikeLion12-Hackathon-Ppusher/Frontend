import "./App.css";
import styled from "styled-components";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Select from "./pages/Select";
import Redirection from "./pages/Redirection";
import Mypage from "./pages/MyPage/Mypage";
import SelectSmoker from "./pages/SelectSmoker";
import SelectNonSmoker from "./pages/SelectNonSmoker";
import SetAccount from "./pages/MyPage/SetAccount";
import SetType from "./pages/MyPage/SetType";
import SetTypeCheck from "./pages/MyPage/SetTypeCheck";
import SetTypeConfirm from "./pages/MyPage/SetTypeConfirm";
import SetNotify from "./pages/MyPage/SetNotify";
import SetNotifyNonSmoker from "./pages/MyPage/SetNotifyNonSmoker";
import SetReport from "./pages/MyPage/SetReport";
import { useContext, useState } from "react";
import { ThemeColorContext } from "./Context/context";

function App() {
  return (
    <Outside>
      <AppDom>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* 초기 경로를 /main으로 리다이렉트 */}
          <Route path="/login" element={<Login></Login>}></Route>
          {/* http://localhost:3000/oauth 에서 받은 인가코드를 백엔드에 전달할 로직이 작성된 Redirection 페이지로 이동 */}
          <Route path="/oauth" element={<Redirection />} />
          <Route path="/select" element={<Select></Select>}></Route>
          <Route
            path="/select-smoker"
            element={<SelectSmoker></SelectSmoker>}
          ></Route>
          <Route
            path="select-non-smoker"
            element={<SelectNonSmoker></SelectNonSmoker>}
          ></Route>
          <Route path="/home/*" element={<Home></Home>}>
            <Route path="map" element={<Map></Map>}></Route>
            <Route path="mypage/*" element={<Mypage></Mypage>}></Route>
            <Route path="type" element={<SetType></SetType>}></Route>
            <Route
              path="set-type-check"
              element={<SetTypeCheck></SetTypeCheck>}
            ></Route>
            <Route
              path="set-type-confirm"
              element={<SetTypeConfirm></SetTypeConfirm>}
            ></Route>
            <Route path="account" element={<SetAccount></SetAccount>}></Route>
            <Route path="notify" element={<SetNotify></SetNotify>}></Route>
            <Route
              path="set-notify-details"
              element={<SetNotifyNonSmoker></SetNotifyNonSmoker>}
            ></Route>
            <Route path="report" element={<SetReport></SetReport>}></Route>
          </Route>
          <Route path="/map" element={<Map></Map>}></Route>
        </Routes>
      </AppDom>
    </Outside>
  );
}

export default App;

const AppDom = styled.div`
  width: 600px;
  max-width: 600px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
    height: 100vh;
  }
`;

// 전체 배경을 밀 색으로 설정 그렇다면 다른 요소들에서 white를 직접 주든가 해야지?
const Outside = styled.div`
  width: 100%;
  height: 100vh;
  background-color: wheat;
`;
