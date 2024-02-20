import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import Board from "./Components/Board/Board";
import Result from "./Components/Result/Result";
import logo from "./Assets/Images/congratulations.png";
import oopsLogo from "./Assets/Images/oops.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

const App = () => {
  const [status, setStatus] = useState(null);
  const [img, setImg] = useState(null);

  const theWinner = (winner) => {
    if (winner === "Draw") {
      const newStatus = winner;
      setStatus(newStatus);
      setImg(oopsLogo);
    } else {
      const newStatus = winner;
      setStatus(newStatus);
      setImg(logo);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/board" element={<Board theWinner={theWinner} />}></Route>
        <Route
          path="/result"
          element={<Result status={status} img={img} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
