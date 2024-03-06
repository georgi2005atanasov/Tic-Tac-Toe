import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

let INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

let PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

let winner;

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function isWinner(gameTurns, gameBoard, players) {
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let hasNull = false;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0][0]][combination[0][1]];
    const secondSquareSymbol = gameBoard[combination[1][0]][combination[1][1]];
    const thirdSquareSymbol = gameBoard[combination[2][0]][combination[2][1]];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
      return;
    }

    if (firstSquareSymbol === null || secondSquareSymbol === null || thirdSquareSymbol === null) {
      hasNull = true;
    }
  }

  if (!hasNull) {
    winner = "None";
  }
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  let activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];

  isWinner(gameTurns, gameBoard, players);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  function handleRematch() {
    setGameTurns([]);
    winner = null;
  }

  function handlePlayerName(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  let playground = <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player isActive={activePlayer == "X" ? "active" : ""} name={players.X} symbol="X" onNameChange={handlePlayerName} />
        <Player isActive={activePlayer == "O" ? "active" : ""} name={players.O} symbol="O" onNameChange={handlePlayerName} />
      </ol>
      {winner && <GameOver winner={winner} onRestart={handleRematch} />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>

  return playground;
}

export default App;
