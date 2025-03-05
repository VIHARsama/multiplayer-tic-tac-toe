import express from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/genarateToken.js";
import { protectRoute } from "../utils/protectRoute.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
   const { username, password, confirmPassword } = req.body;
   try {
      const existUser = await User.findOne({ username });
      if (existUser) {
         return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
         username: username,
         password: hashedPassword,
      });

      if (newUser) {
         generateToken(newUser._id, res);
         await newUser.save();

         res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
         });
      } else {
         res.status(400).json({ message: "Invalid User data" });
      }
   } catch (error) {
      console.log("error in register route", error);
      return res.status(500).json({ message: "Internal server error" });
   }
});

router.post("/login", async (req, res) => {
   const { username, password } = req.body;
   try {
      const existUser = await User.findOne({ username });

      if (!existUser) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
      if (!isPasswordCorrect) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      generateToken(existUser._id, res);

      res.status(200).json({
         _id: existUser._id,
         username: existUser.username,
      });
   } catch (error) {
      console.log("error in login route", error);
      return res.status(500).json({ message: "Internal server error" });
   }
});

router.post("/logout", (req, res) => {
   try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
   } catch (error) {
      console.log("error in logout route", error);
      res.status(500).json({ message: "Internal server error" });
   }
});

router.get("/check-auth", protectRoute, (req, res) => {
   try {
      res.status(200).json(req.user);
   } catch (error) {
      console.log("error in check-auth route", error);
      res.status(500).json({ message: "Internal server error" });
   }
});

export default router;
