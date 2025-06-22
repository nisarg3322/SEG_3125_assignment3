import "../App.css";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Image,
  Container,
  Nav,
  Navbar,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Home">
      <header className="App-header">
        <Navbar sticky="top" style={{ backgroundColor: "#000000" }}>
          <Container>
            <Navbar.Brand
              style={{
                fontFamily: "Courier new",
                marginTop: "3px",
                color: "#D714D7",
              }}
              href=""
            >
              MemMatch
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link style={{ color: "#FFFFFF" }} as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: "#FFFFFF" }} as={Link} to="/Contact">
                Contact
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container>
          <Row className="mt-4">
            <Col
              className="d-flex flex-column align-items-center justify-content-center"
              md={3}
            >
              <Image
                className="pic-service"
                src="/KingCard.jpg"
                roundedCircle
              />
            </Col>
            <Col
              className=" intro-service d-flex flex-column justify-content-center"
              sm={6}
            >
              <div
                className="text-center "
                style={{ fontFamily: "Courier new", color: "#D714D7" }}
              >
                <h1>MemMatch</h1>
              </div>
              <div className=" d-flex justify-content-center">
                <p className="intro-service ">
                  Welcome to MemMatch, a fun and challenging memory card game!
                  Choose between easy mode (5 seconds to memorize) or hard mode
                  (2 seconds), then match all the card pairs using your memory
                  skills.
                </p>
              </div>
            </Col>
            <Col
              className="d-flex flex-column align-items-center justify-content-center"
              md={3}
            >
              <Image
                className="pic-service"
                src="/LionCard.jpg"
                roundedCircle
              />
            </Col>
          </Row>
        </Container>

        <Container>
          <div className="text-center m-5">
            <h2 style={{ color: "#00FFFF" }}>Game Modes</h2>
          </div>
          <Row className=" justify-content-center">
            <Col className="d-flex justify-content-center " md={5}>
              <Card style={{ width: "300px", backgroundColor: "#000000" }}>
                <Card.Body className="card-border">
                  <Card.Title style={{ color: "#00FFFF", fontSize: "30px" }}>
                    Easy Mode
                  </Card.Title>
                  <Card.Text>
                    The easy mode allows you to view cards for 5 seconds and
                    then they are hidden. You need to match them from memory.
                  </Card.Text>
                  <Button
                    as={Link}
                    to="/CardGame"
                    state={{ difficulty: "easy" }}
                    style={{ backgroundColor: "#800C81", border: "0px" }}
                  >
                    Play Easy Mode
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col className="d-flex justify-content-center " md={5}>
              <Card style={{ width: "300px", backgroundColor: "#000000" }}>
                <Card.Body className="card-border">
                  <Card.Title style={{ color: "#00FFFF", fontSize: "30px" }}>
                    Hard Mode
                  </Card.Title>
                  <Card.Text>
                    The hard mode allows you to view cards for only 2 seconds
                    and then they are hidden. You need to match them from
                    memory.
                  </Card.Text>
                  <Button
                    as={Link}
                    to="/CardGame"
                    state={{ difficulty: "hard" }}
                    style={{ backgroundColor: "#800C81", border: "0px" }}
                  >
                    Play Hard Mode
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <div style={{ padding: "50px", backgroundColor: "black" }}> </div>
      </header>
    </div>
  );
}

export default Home;
