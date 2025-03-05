import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
   roomId: {
      type: String,
      unique: true,
   },
   players: [
      {
         username: String,
         socketId: String,
      },
   ],
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
