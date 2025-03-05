import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const protectRoute = async (req, res, next) => {
   try {
      const token = req.cookies.jwt;
      if (!token) {
         return res.status(401).json({ message: "Unauthorized access - No Token Provided" });
      }

      const decodedToken = jwt.verify(token, JWT_SECRET);
      if (!decodedToken) {
         return res.status(401).json({ message: "Unauthorized access - Invalid Token Provided" });
      }

      const user = await User.findById(decodedToken.userId).select("-password");
      if (!user) {
         return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
   } catch (error) {
      console.log("error in protectRoute middleware", error);
      res.status(500).json({ message: "User not found" });
   }
};
