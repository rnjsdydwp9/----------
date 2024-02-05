import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./componets/Nav";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage/index";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import { useRef } from "react";
import SignUpPage from "./pages/SignUpPage/index";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
function App() {
  const ref = useRef("안녕하세요");
  console.log(ref);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="/:movieId" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
