import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

export const ProtectRoute = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies["token"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized- no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(404).json({message: 'user not found'})
    }
    req.user= user;

    next()
  } catch (error) {
    console.log('error in protectRoute: ', error)
    return res.status(500).json({message: 'internal server error'})
  }

// try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     console.log("Error in auth middleware:", error);
//     res.status(401).json({ message: "Invalid token" });
//   }
};
