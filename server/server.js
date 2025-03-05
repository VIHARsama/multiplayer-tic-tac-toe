import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { app, server } from "./utils/socket.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   }),
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
   .connect(MONGODB_URL)
   .then(() => {
      console.log("connected to MongoDB");
   })
   .catch((error) => {
      console.log("error connecting to MongoDB".error);
   });

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
   res.json("hello server");
});

server.listen(PORT, () => {
   console.log("server started running on port", PORT);
});
