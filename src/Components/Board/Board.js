import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../Assets/Images/logo.png";
import { Modal, Button } from "react-bootstrap";

const Board = () => {
  const navigate = useNavigate();
  const [durationInSeconds, setDurationInSeconds] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const quitModalRef = useRef(null);


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

  useEffect(() => {
    // timer
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

  const openQuitModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatTime = (time) => {
    return time < 10 ? "0" + time : time;
  };

  // quit button
  const quitModal = () => {
    navigate("/");
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
                <Modal.Title>
                  Are you sure you want to quit?
                </Modal.Title>
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
        <div className="board mb-4">
          <div className="board-row">
            <button className="square">1</button>
            <button className="square">2</button>
            <button className="square">3</button>
          </div>
          <div className="board-row">
            <button className="square">4</button>
            <button className="square">5</button>
            <button className="square">6</button>
          </div>
          <div className="board-row">
            <button className="square">7</button>
            <button className="square">8</button>
            <button className="square">9</button>
          </div>
        </div>
        <div className="turn text-center">
            <h3>Player 1 Turn</h3>
        </div>
      </div>
    </div>
  );
};

export default Board;
