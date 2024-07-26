import "./App.css";
import styled from "styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Map from "./pages/Map";

function App() {
  return (
    <AppDom>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* 초기 경로를 /main으로 리다이렉트 */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/map" element={<Map></Map>}></Route>
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
`;
