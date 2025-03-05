import React, { use, useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Home = () => {
   const [roomId, setRoomId] = useState("");
   const { authUser, setAuthUser } = useAuthContext();

   const navigate = useNavigate();

   const logoutUser = async () => {
      try {
         await axiosInstance.post("/auth/logout");
         setAuthUser(null);
         toast.success("Logged out successfully");
      } catch (error) {
         toast.error(error?.response?.data?.message || "Logout failed");
      }
   };

   const createNewRoom = (e) => {
      e.preventDefault();
      const id = uuidv4();
      setRoomId(id);
      toast.success("Created new room");
   };

   const joinRoom = () => {
      if (!roomId) {
         toast.error("Room ID is required");
         return;
      }

      navigate(`/game/${roomId}`);
   };

   return (
      <div className="home">
         <div className="container">
            <h2 className="home-heading">Enter a room</h2>

            <div className="room-id">
               <h3 className="room-heading">Paste room ID</h3>
               <input
                  className="room-input"
                  type="text"
                  placeholder="Enter your room ID..."
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
               />
               <button className="join-room-button" onClick={joinRoom}>
                  Join Room
               </button>
            </div>

            <p className="create-room-p">
               You can also create a room -{" "}
               <a className="create-room-button" onClick={createNewRoom}>
                  Create Room
               </a>
            </p>

            <div className="logout">
               <button onClick={logoutUser} className="logout-button">
                  Logout
               </button>
            </div>
         </div>
      </div>
   );
};

export default Home;
