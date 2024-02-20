import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";

const MainPage = () => {
  const navigate = useNavigate();
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(playerOne != "" && playerTwo != ""){
      // handleStartGame();
      navigate("/board", { state: { playerOne, playerTwo } });
    }
  };

  // const handleStartGame = () => {
  //   navigate("/board", { state: { playerOne, playerTwo } });
  // };

  return (
    <div className="main-page">
      <Container>
        <Row>
          <Col md={12}>
            <div className="game-app">
              <div className="game-container">
                <div className="game logo">
                  <img className="img-fluid" src={logo} alt="APP LOGO" />
                </div>
                <form onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    className="form-control mb-2" 
                    id="Player1" 
                    name="Player1" 
                    placeholder="Player 1" 
                    value={playerOne}
                    onChange={(e) => setPlayerOne(e.target.value)} 
                    maxLength="10"
                  />
                  <input 
                    type="text" 
                    className="form-control" 
                    id="Player2" 
                    name="Player2" 
                    placeholder="Player 2" 
                    value={playerTwo}
                    onChange={(e) => setPlayerTwo(e.target.value)} 
                    maxLength="10"
                  />
                  <button type="submit" className="text-button">PLAY GAME</button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;