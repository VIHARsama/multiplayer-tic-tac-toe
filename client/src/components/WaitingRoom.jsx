import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
   const navigate = useNavigate();

   const leaveRoom = () => {
      navigate("/");
   };
   return (
      <div className="waiting-room">
         <h1 className="waiting-room-heading">Waiting for opponent to join...</h1>
         <div className="leave-waiting-room">
            <button onClick={leaveRoom} className="waiting-room-button">
               Leave Room
            </button>
         </div>
      </div>
   );
};

export default WaitingRoom;
