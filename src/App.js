import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import HomeNav from "./pages/HomeNav";
import styled from "styled-components";
import Home from "./pages/Home";

function App() {
  return (
    <AppDom>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </AppDom>
  );
}

export default App;

const AppDom = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
