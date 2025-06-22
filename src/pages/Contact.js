// import logo from './logo.svg';
import "../App.css";
import { Link } from "react-router-dom";
import { Card, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
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

        <Row className=" justify-content-center">
          <Col className="d-flex justify-content-center " md={12}>
            <Card style={{ width: "500px", backgroundColor: "#000000" }}>
              <Card.Body className="card-border">
                <Card.Title style={{ color: "#00FFFF", fontSize: "30px" }}>
                  Contact:
                </Card.Title>
                <Card.Text>
                  <p>Email: MemMatch@gmail.com</p>
                  <p>Phone: 613-834-2932</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div style={{ padding: "400px", backgroundColor: "black" }}> </div>
      </header>
    </div>
  );
}

export default Contact;
