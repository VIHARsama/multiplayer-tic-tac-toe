import React, { useState, useEffect } from "react";
import { circleSvg, crossSvg } from "../lib/TicTacToeSvg.jsx";

const Square = ({
   id,
   currentPlayer,
   setCurrentPlayer,
   boardValue,
   setBoardValue,
   gameState,
   winningPattern,
   playerWon,
   rowIndex,
   columnIndex,
}) => {
   const [icon, setIcon] = useState(null);

   const chooseSquare = () => {
      if (!icon && gameState) {
         if (currentPlayer === "X") {
            setIcon(crossSvg);
         } else {
            setIcon(circleSvg);
         }

         setBoardValue((boardVal) => {
            let currVal = [...boardVal];
            currVal[rowIndex] = [...currVal[rowIndex]];
            currVal[rowIndex][columnIndex] = currentPlayer;
            return currVal;
         });

         setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
   };

   useEffect(() => {
      // Reset icon when boardValue changes (i.e., a new game is started)
      const value = boardValue[rowIndex][columnIndex];
      if (value === "X") {
         setIcon(crossSvg);
      } else if (value === "O") {
         setIcon(circleSvg);
      } else {
         setIcon(null);
      }
   }, [boardValue, rowIndex, columnIndex]);

   return (
      <div
         onClick={chooseSquare}
         className={`square ${winningPattern.includes(id) ? playerWon + "-won" : ""}`}
      >
         {icon}
      </div>
   );
};

export default Square;
