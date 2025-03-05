import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import Room from "../models/room.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("joinRoom", async ({ roomId, username }) => {
    try {
      const existRoom = await Room.findOne({ roomId });
      if (!existRoom) {
        const newRoom = new Room({
          roomId,
          players: [{ username, socketId: socket.id }],
        });
        await newRoom.save();
        socket.join(roomId);
        socket.emit("waitingForOpponent", roomId);
      } else {
        if (existRoom.players.length < 2) {
          existRoom.players.push({ username, socketId: socket.id });
          await existRoom.save();
          socket.join(roomId);

          socket.emit("gameStart", roomId);
          socket
            .to(roomId)
            .emit("opponentJoined", existRoom.players[0].username);
          io.to(roomId).emit("gameStart", roomId);
        } else {
          socket.emit("roomFull", "The room is already full");
        }
      }
    } catch (error) {
      console.log("error joining room:", error);
    }
  });

  socket.on("disconnect", async () => {
    try {
      const currRoom = await Room.findOneAndUpdate(
        { "players.socketId": socket.id },
        { $pull: { players: { socketId: socket.id } } },
        { new: true },
      );

      if (currRoom && currRoom.players.length == 0) {
        await Room.deleteOne({ roomId: currRoom.roomId });
      } else if (currRoom && currRoom.players.length == 1) {
        const remainingPlayer = currRoom.players[0].socketId;
        io.to(remainingPlayer).emit("waitingForOpponent", currRoom.roomId);
        io.to(remainingPlayer).emit(
          "playerDisconnected",
          "Your opponent has disconnected",
        );
      }
    } catch (error) {
      console.log("error on disconnect:", error);
    }
  });
});

export { app, server, io };
