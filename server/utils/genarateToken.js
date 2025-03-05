import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId, res) => {
   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "12h",
   });

   res.cookie("jwt", token, {
      maxAge: 12 * 60 * 60 * 1000,
      httpOnly: true,
      samesite: "strict",
      secure: true,
   });
};
