/*import React, { useState ,useEffect } from "react";
import Board from "./Board.jsx";





const Game = () => {
  //const [history, setHistory] = useState([{ squares: Array(6).fill(null) }]);
	
  //const [stepNumber, setStepNumber] = useState(0);
  //const [isNext, setIsNext] = useState(true);
	
 
	

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = isNext ? "X" : "O";

    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setIsNext(!isNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const finalist = history.map((step, move) => {
	
    const desc = move ? "Go to Move: " + move : " Go to game  start ";
    return <li key={move}>{desc}</li>;
  });
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isNext ? "X" : "O");
  }

  return (
    <>
       <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleSquareClick} />
      </div>
      <div className="game-info">
			<div>Matches: {matches}</div>
      </div>
    </div>
    </>
  );
};
const calculateWinner = (squares) => {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[b] === squares[c] &&
      squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
*/
import React, { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';


const initialSquares = [
  { value: '@', id: 1, matched: false, revealed: false },
  { value: '@', id: 2, matched: false, revealed: false },
  { value: '#', id: 3, matched: false, revealed: false },
  { value: '#', id: 4, matched: false, revealed: false },
  { value: '$', id: 5, matched: false, revealed: false },
  { value: '$', id: 6, matched: false, revealed: false },
  { value: '%', id: 7, matched: false, revealed: false },
  { value: '%', id: 8, matched: false, revealed: false },
  { value: '*', id: 9, matched: false, revealed: false },
  { value: '*', id: 10, matched: false, revealed: false },
  { value: '^', id: 11, matched: false, revealed: false },
  { value: '^', id: 12, matched: false, revealed: false },
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Game = () => {
  const [squares, setSquares] = useState(shuffleArray([...initialSquares]));
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    if (firstPick && secondPick) {
      if (firstPick.value === secondPick.value) {
        setSquares((prevSquares) =>
          prevSquares.map((square) =>
            square.value === firstPick.value
              ? { ...square, matched: true }
              : square
          )
        );
        setMatches((prevMatches) => prevMatches + 1);
        resetPicks();
      } else {
        setTimeout(() => {
          resetPicks();
        }, 500);
      }
    }
  }, [firstPick, secondPick]);

  const resetPicks = () => {
    setSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.matched
          ? square
          : { ...square, revealed: false }
      )
    );
    setFirstPick(null);
    setSecondPick(null);
  };

  const handleSquareClick = (id) => {
    const clickedSquare = squares.find((square) => square.id === id);
    if (clickedSquare.revealed || clickedSquare.matched) return;

    setSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.id === id ? { ...square, revealed: true } : square
      )
    );

    if (!firstPick) {
      setFirstPick(clickedSquare);
    } else if (!secondPick) {
      setSecondPick(clickedSquare);
    }
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleSquareClick} />
      </div>
      <div className="game-info">
			<div>Matches: {matches}</div>
      </div>
    </div>
  );
};

export default Game;
