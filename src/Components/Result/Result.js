import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const Result = ({status, img}) => {
  const location = useLocation();
  const [result, setResult] = useState(null);
  const playerOne = location.state ? location.state.playerOne : "";
  const playerTwo = location.state ? location.state.playerTwo : "";
  console.log("1: ", playerOne, "2: ", playerTwo)

  useEffect(() => {
    if(status === "Draw"){
      const newResult = "Match " + status;
      setResult(newResult);
    }
    else if(status === "X"){
      const newResult = "Winner: " + playerOne + " ( " + status + " )";
      setResult(newResult);
    }
    else if(status === "O"){
      const newResult = "Winner: " + playerTwo + " ( " + status + " )";
      setResult(newResult);
    }
  }, [])
  
  

  return (
    <div className="result">
        <Row>
          <Col md={12}>
            <div className="game-app">
              <div className="game-container">
                <div className="game logo">
                  <img className="img-fluid" src={img} alt="APP LOGO" />
                </div>
                <div className="winner-tag text-center">
                    <h3>{result}</h3>
                </div>
                <div className="result-buttons d-flex align-items-center justify-content-center">
                    <Link className="footer-button" to="/">
                        Play Again?
                    </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
    </div>
  );
};

export default Result;
