// import logo from './logo.svg';
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Image,
  Container,
  Nav,
  Navbar,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function Game() {
  // Card image names (from public folder)
  const regularCards = [
    "AceCard.jpg",
    "KingCard.jpg",
    "QueenCard.jpg",
    "JackCard.jpg",
  ];
  const animalCards = [
    "LionCard.jpg",
    "HippoCard.jpg",
    "GiraffeCard.jpg",
    "ElephantCard.jpg",
  ];

  // Card type state
  const [cardType, setCardType] = useState("Regular");

  // Choose cards based on cardType
  const cardImages = cardType === "Regular" ? regularCards : animalCards;

  // Shuffle helper
  function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Initial state
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState([]); // {id, image, revealed, matched}
  const [gameStarted, setGameStarted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState([]); // indices of selected cards
  const [disableClicks, setDisableClicks] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.difficulty) {
      setDifficulty(location.state.difficulty);
    }
    // eslint-disable-next-line
  }, []);

  // Setup cards on game start
  const startGame = () => {
    let pool = [];
    while (pool.length < 8) {
      pool = pool.concat(cardImages);
    }
    const shuffled = shuffle(pool).slice(0, 8);
    const cardObjs = shuffled.map((img, idx) => ({
      id: idx + "-" + Math.random().toString(36).substr(2, 5),
      image: img,
      revealed: true, // show all at start
      matched: false,
    }));
    setCards(cardObjs);
    setGameStarted(true);
    setShowAll(true);
    setTimer(0);
    setScore(0);
    setSelected([]);
    setDisableClicks(false);
  };

  // Reset game state
  const resetGame = () => {
    setGameStarted(false);
    setCards([]);
    setShowAll(false);
    setTimer(0);
    setScore(0);
    setSelected([]);
    setDisableClicks(false);
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  // Show all cards for 5s (easy) or 3s (hard) at start
  useEffect(() => {
    if (gameStarted) {
      const revealTime = difficulty === "easy" ? 4 : 2;
      // Start timer
      let t = 0;
      const id = setInterval(() => {
        t += 1;
        setTimer(t);
        if (t >= revealTime) {
          setShowAll(false);
          setCards((prev) =>
            prev.map((card) => ({ ...card, revealed: false }))
          );
          clearInterval(id);
          setIntervalId(null);
        }
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [gameStarted, difficulty, cardType]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  // Handle difficulty change
  const handleDifficulty = (val) => {
    setDifficulty(val);
    setGameStarted(false);
    setCards([]);
    setShowAll(false);
    setTimer(0);
  };

  // Handle card type change
  const handleCardType = (val) => {
    setCardType(val);
    setGameStarted(false);
    setCards([]);
    setShowAll(false);
    setTimer(0);
  };

  // Card click handler (with matching logic)
  const handleCardClick = (idx) => {
    if (!gameStarted || showAll || disableClicks) return;
    if (cards[idx].revealed || cards[idx].matched) return;
    if (selected.length === 2) return;

    const newCards = cards.map((card, i) =>
      i === idx ? { ...card, revealed: true } : card
    );
    const newSelected = [...selected, idx];
    setCards(newCards);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setDisableClicks(true);
      const [firstIdx, secondIdx] = newSelected;
      if (newCards[firstIdx].image === newCards[secondIdx].image) {
        // Match!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === firstIdx || i === secondIdx
                ? { ...card, matched: true }
                : card
            )
          );
          setScore((prev) => prev + 1);
          setSelected([]);
          setDisableClicks(false);
        }, 700);
      } else {
        // Not a match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === firstIdx || i === secondIdx
                ? { ...card, revealed: false }
                : card
            )
          );
          setSelected([]);
          setDisableClicks(false);
        }, 1000);
      }
    }
  };

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

        <Container className="min-vh-100 ">
          <div
            className="text-center "
            style={{ fontFamily: "Courier new", color: "#D714D7" }}
          >
            <h1>MemMatch</h1>
          </div>

          <Row className="mt-5">
            <Col className="d-flex flex-column align-items-center" md={2}>
              <Row>
                <Button
                  className="mt-2 w-100 text-dark"
                  style={{ backgroundColor: "#00FF00", borderColor: "#00FF00" }}
                  onClick={startGame}
                  disabled={gameStarted && !showAll}
                >
                  Start Game!
                </Button>
                <Button
                  className="mt-2 w-100 text-white"
                  style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}
                  onClick={resetGame}
                >
                  Reset
                </Button>

                <span className="mt-3 text-warning">Timer:</span>
                <p className="bg-white text-dark text-center w-auto px-2">
                  {timer}s
                </p>

                <span className="mt-3 text-warning">Difficulty:</span>
                <ToggleButtonGroup
                  className="mt-1"
                  type="radio"
                  name="difficulty"
                  value={difficulty}
                  onChange={handleDifficulty}
                >
                  <ToggleButton id="easy" value="easy" variant="outline-light">
                    Easy
                  </ToggleButton>
                  <ToggleButton id="hard" value="hard" variant="outline-light">
                    Hard
                  </ToggleButton>
                </ToggleButtonGroup>

                <span className="mt-3 text-warning">Card Type:</span>
                <ToggleButtonGroup
                  className="mt-1"
                  type="radio"
                  name="CardType"
                  value={cardType}
                  onChange={handleCardType}
                >
                  <ToggleButton
                    id="Regular"
                    value="Regular"
                    variant="outline-light"
                  >
                    Regular
                  </ToggleButton>
                  <ToggleButton
                    id="Animal"
                    value="Animal"
                    variant="outline-light"
                  >
                    Animal
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>
            </Col>

            <Col sm={10}>
              <Row className="d-flex justify-content-center">
                <h2 className="text-white text-center">
                  Score:{" "}
                  <span
                    className="d-inline-block ms-2"
                    style={{ width: "40px" }}
                  >
                    {score}
                  </span>
                </h2>
              </Row>

              <Row>
                <p className="text-white text-center" hidden={gameStarted}>
                  Press "Start Game!" to begin!
                </p>
              </Row>

              <Row>
                {cards.map((card, idx) => (
                  <Col className="mt-3" xs={6} md={3} key={card.id}>
                    <div
                      className={`d-flex justify-content-center align-items-center  ${
                        disableClicks ? "pe-none" : "cursor-pointer"
                      }`}
                      style={{ height: "250px" }}
                      onClick={() => handleCardClick(idx)}
                    >
                      {card.revealed || card.matched ? (
                        <Image
                          src={`/${card.image}`}
                          alt={`Card ${idx + 1}`}
                          className="img-fluid"
                          style={{ maxHeight: "90%", maxWidth: "90%" }}
                        />
                      ) : (
                        <div
                          className="w-100 h-100 rounded bg-danger"
                          style={{ maxWidth: "80%", maxHeight: "80%" }}
                        ></div>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default Game;
