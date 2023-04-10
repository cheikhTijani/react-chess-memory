import React, { useEffect, useState } from "react";
import './App.css';
import SinglePiece from "./components/SinglePiece";

const piecesArray = [
  { "src": "./img/pawn.svg", matched: false },
  { "src": "./img/bishop.svg", matched: false },
  { "src": "./img/knight.svg", matched: false },
  { "src": "./img/rook.svg", matched: false },
  { "src": "./img/queen.svg", matched: false },
  { "src": "./img/king.svg", matched: false }
]

function App() {
  const [pieces, setPieces] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [end, setEnd] = useState(false);
  const [score, setScore] = useState(0);

  // handling game end and score
  const checkEnd = () => {
    const matched = pieces?.filter(piece => piece.matched === true);
    if (matched.length === 12) {
      if (turns <= 7) {
        setScore(10)
      } else if (turns <= 9) {
        setScore(8)
      } else if (turns <= 11) {
        setScore(6)
      } else if (turns <= 13) {
        setScore(4)
      } else if (turns <= 15) {
        setScore(2)
      } else {
        setScore(0)
      }
      setEnd(true);
    }

  }

  useEffect(() => {
    checkEnd()
  })

  // init game
  useEffect(() => {
    shufflePieces();
  }, [])

  // game logic (comparing choices)
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setPieces(prevPieces => {
          return prevPieces.map(piece => {
            if (piece.src === choiceOne.src) {
              return { ...piece, matched: true }
            } else {
              return piece;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo])



  // shuffle pieces
  const shufflePieces = () => {
    const shuffledPieces = [...piecesArray, ...piecesArray]
      .sort(() => Math.random() - 0.5)
      .map((piece) => ({ ...piece, id: Math.random() }));

    setchoiceOne(null);
    setChoiceTwo(null);
    setPieces(shuffledPieces);
    setTurns(0);
    setScore(0);
    setEnd(false);
  }

  // handle a choice
  const handleChoice = (piece) => {
    choiceOne ? setChoiceTwo(piece) : setchoiceOne(piece)
  }

  // reset choices
  const resetTurn = () => {
    setchoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false);
  }

  return (
    <div className="container App">
      <h2 className="d-flex justify-content-around align-items-center">Match Chess Pieces
        <small><button className="newGameBtn" onClick={shufflePieces}>New Game</button></small>
      </h2>

      <div className='pieces-grid'>
        {pieces.map(piece => (
          <SinglePiece
            key={piece.id}
            piece={piece}
            handleChoice={handleChoice}
            flipped={piece === choiceOne || piece === choiceTwo || piece.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {end && <p>The game has ended, you scored {score} out of 10</p>}
    </div>
  );
}

export default App;
