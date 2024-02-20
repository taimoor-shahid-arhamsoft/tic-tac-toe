import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/Images/logo.png";
import { Modal, Button } from "react-bootstrap";
import Square from "../Square/Square";

const Board = ({ theWinner }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [durationInSeconds, setDurationInSeconds] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const quitModalRef = useRef(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const playerOne = location.state ? location.state.playerOne : "";
  const playerTwo = location.state ? location.state.playerTwo : "";

  // tab kills and reload method
  useEffect(() => {
    const handleUnload = (event) => {
      if (!showModal) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [showModal]);

  console.log("heloo", playerOne)
  console.log("heloo2", playerTwo)

  // timer
  useEffect(() => {
    const startTimer = () => {
      const id = setInterval(() => {
        setDurationInSeconds((prevDuration) => prevDuration + 1);
      }, 1000);
      return id;
    };
    const interval = startTimer();
    return () => {
      clearInterval(interval);
    };
  }, []);

  // modal working
  const openQuitModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // time format
  const formatTime = (time) => {
    return time < 10 ? "0" + time : time;
  };

  // quit button
  const quitModal = () => {
    navigate("/");
  };

  /*button click function*/
  const clickWorking = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return null;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const allSquaresFilled = nextSquares.every((square) => square !== null);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      theWinner(winner);
      navigate("/result", { state: { playerOne: playerOne, playerTwo: playerTwo } });
    } else if (allSquaresFilled) {
      theWinner("Draw");
      navigate("/result", { state: { playerOne: playerOne, playerTwo: playerTwo } });
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const totalLines = lines.length;
    for (let i = 0; i < totalLines; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="board">
      <div className="game-app">
        <div className="game-header">
          <div className="game logo">
            <img className="img-fluid" src={logo} alt="APP LOGO" />
          </div>
          <div className="quit-button-in">
            <button
              type="button"
              className="quit-button"
              onClick={openQuitModal}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <Modal
              id="quitModal"
              show={showModal}
              onHide={handleCloseModal}
              ref={quitModalRef}
            >
              <Modal.Header closeButton>
                <div className="modal-img">
                  <img className="img-fluid" src={logo} alt="MODAL LOGO" />
                </div>
              </Modal.Header>
              <Modal.Body>
                <Modal.Title>Are you sure you want to quit?</Modal.Title>
                <p>( your marked data would be lost in this case )</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  No
                </Button>
                <Button variant="primary" onClick={quitModal}>
                  Yes, Quit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="time">
            <div id="timer">
              {formatTime(Math.floor(durationInSeconds / 3600))}:
              {formatTime(Math.floor((durationInSeconds % 3600) / 60))}:
              {formatTime(durationInSeconds % 60)}
            </div>
          </div>
        </div>
        <div className="game-section d-flex align-items-center mb-4">
          <div className="board-game">
            <div className="board-row d-flex align-items-center">
              <Square
                value={squares[0]}
                onHandleClick={() => clickWorking(0)}
              />
              <Square
                value={squares[1]}
                onHandleClick={() => clickWorking(1)}
              />
              <Square
                value={squares[2]}
                onHandleClick={() => clickWorking(2)}
              />
            </div>
            <div className="board-row d-flex align-items-center">
              <Square
                value={squares[3]}
                onHandleClick={() => clickWorking(3)}
              />
              <Square
                value={squares[4]}
                onHandleClick={() => clickWorking(4)}
              />
              <Square
                value={squares[5]}
                onHandleClick={() => clickWorking(5)}
              />
            </div>
            <div className="board-row d-flex align-items-center">
              <Square
                value={squares[6]}
                onHandleClick={() => clickWorking(6)}
              />
              <Square
                value={squares[7]}
                onHandleClick={() => clickWorking(7)}
              />
              <Square
                value={squares[8]}
                onHandleClick={() => clickWorking(8)}
              />
            </div>
          </div>
          <div className="player-option">
            <h4>
              Player 1 : <span className="player-name">{playerOne}</span><span className="x-mark">(X)</span>
            </h4>
            <h4>
              Player 2 : <span className="player-name">{playerTwo}</span><span className="o-mark">(O)</span>
            </h4>
          </div>
        </div>
        <div className="turn text-center">
          <h3>{xIsNext ? `${playerOne} Turn` : `${playerTwo} Turn`}</h3>
        </div>
      </div>
    </div>
  );
};

export default Board;