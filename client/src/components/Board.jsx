import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext.jsx";
import Square from "./Square.jsx";
import { useNavigate } from "react-router-dom";

const initialBoard = [
   ["", "", ""],
   ["", "", ""],
   ["", "", ""],
];

const Board = ({ roomId }) => {
   const [boardValue, setBoardValue] = useState(initialBoard); // tic tac toe board
   const [currentPlayer, setCurrentPlayer] = useState("X"); // current player movw
   const [opponentUsername, setOpponentUsername] = useState("enemy");
   const [playerWon, setPlayerWon] = useState(); // contains username of player won
   const [gameState, setGameState] = useState(true); // to keep the game running
   const [winningPattern, setWinningPattern] = useState([]);

   const { authUser } = useAuthContext();
   const navigate = useNavigate();

   const checkWinner = () => {
      // check horizontal
      for (let row = 0; row < boardValue.length; row++) {
         if (
            boardValue[row][0] === boardValue[row][1] &&
            boardValue[row][1] == boardValue[row][2] &&
            boardValue[row][0] !== ""
         ) {
            setGameState(false);
            setWinningPattern([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
            setPlayerWon(currentPlayer === "X" ? "O" : "X");
            return boardValue[row][0];
         }
      }

      // check vertical
      for (let column = 0; column < boardValue.length; column++) {
         if (
            boardValue[0][column] === boardValue[1][column] &&
            boardValue[1][column] == boardValue[2][column] &&
            boardValue[0][column] !== ""
         ) {
            setGameState(false);
            setWinningPattern([0 * 3 + column, 1 * 3 + column, 2 * 3 + column]);
            setPlayerWon(currentPlayer === "X" ? "O" : "X");
            return boardValue[0][column];
         }
      }

      // check diagnoal(top-left to botton-right)
      if (
         boardValue[0][0] === boardValue[1][1] &&
         boardValue[1][1] === boardValue[2][2] &&
         boardValue[0][0] != ""
      ) {
         setGameState(false);
         setWinningPattern([0, 4, 8]);
         setPlayerWon(currentPlayer === "X" ? "O" : "X");
         return boardValue[0][0];
      }

      // check diagonal (top-right to bottom-left)
      if (
         boardValue[0][2] === boardValue[1][1] &&
         boardValue[1][1] === boardValue[2][0] &&
         boardValue[0][2] != ""
      ) {
         setGameState(false);
         setWinningPattern([2, 4, 6]);
         return boardValue[0][2];
      }

      // check draw
      let isDraw = true;
      for (let row = 0; row < 3; row++) {
         for (let column = 0; column < 3; column++) {
            if (boardValue[row][column] == "") {
               isDraw = false;
               break;
            }
         }
         if (!isDraw) break;
      }

      if (isDraw) {
         setGameState(false);
         setPlayerWon("draw");
      }

      return null;
   };

   const resetGame = () => {
      setBoardValue(initialBoard);
      setCurrentPlayer("X");
      setGameState(true);
      setPlayerWon(null);
      setWinningPattern([]);
   };

   const copyRoomID = () => {};

   const leaveRoom = () => {
      navigate("/");
   };

   useEffect(() => {
      const winner = checkWinner();
      if (winner) {
         setPlayerWon(winner);
      }
   }, [boardValue]);

   return (
      <div className="board">
         <div className="move-detection">
            <div className={`player ${currentPlayer === "X" ? "player-highlight" : ""}`}>
               {authUser.username}
            </div>
            <div className={`opponent ${currentPlayer === "O" ? "opponent-highlight" : ""}`}>
               {opponentUsername}
            </div>
         </div>

         <div>
            <h1 className="game-heading">Tic Tac Toe</h1>
            <div className="square-wrapper">
               {boardValue.map((arr, rowIndex) => {
                  return arr.map((e, columnIndex) => {
                     return (
                        <Square
                           key={rowIndex * 3 + columnIndex}
                           id={rowIndex * 3 + columnIndex}
                           currentPlayer={currentPlayer}
                           setCurrentPlayer={setCurrentPlayer}
                           boardValue={boardValue}
                           setBoardValue={setBoardValue}
                           gameState={gameState}
                           winningPattern={winningPattern}
                           playerWon={playerWon}
                           rowIndex={rowIndex}
                           columnIndex={columnIndex}
                        />
                     );
                  });
               })}
            </div>
            {/* Show reset button only when the game is finished (gameState is false) */}
            {!gameState && playerWon !== "draw" && (
               <div>
                  <h3 className="game-finished">{playerWon} won the game!</h3>
                  <div className="button-wrapper">
                     <button onClick={resetGame} className="reset-button">
                        Reset Game
                     </button>
                  </div>
               </div>
            )}

            {/* Show draw message and reset button */}
            {!gameState && playerWon === "draw" && (
               <div>
                  <h3 className="game-finished">Game ended in a draw</h3>
                  <button onClick={resetGame} className="game-button reset-button">
                     Reset Game
                  </button>
               </div>
            )}

            <div className="button-wrapper">
               <button onClick={copyRoomID} className="game-button copy-room-id">
                  Copy Room ID
               </button>
               <button onClick={leaveRoom} className="game-button leave-room">
                  Leave Room
               </button>
            </div>
         </div>
      </div>
   );
};

export default Board;
