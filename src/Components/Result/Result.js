import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const Result = ({status, img}) => {

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
                    <h3>{status}</h3>
                </div>
                <div className="result-buttons d-flex align-items-center justify-content-center">
                    <Link className="footer-button" to="/board">
                        Play Again?
                    </Link>
                    <Link className="footer-button red ms-2" to="/">
                        Quit
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
