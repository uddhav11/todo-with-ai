import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/emailService.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../middleware/generateCookie.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // await sendEmail(
    //   email,
    //   "Welcome to Task Manager",
    //   `Hi ${name}, Welcome to Task Manager! Start managing your tasks now!`
    // );

    const token = generateTokenAndSetCookies(newUser._id, res);

    res.status(201).json({
      user: { ...newUser._doc, password: "" },
      token, // Include token in response
    });
  } catch (error) {
    console.log("error in register", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkingUserByEmail = await User.findOne({ email });
    if (!checkingUserByEmail) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(
      password,
      checkingUserByEmail.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateTokenAndSetCookies(checkingUserByEmail._id, res);

    res.status(200).json({
      user: {
        ...checkingUserByEmail._doc,
        password: "",
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};

export const googleCallback = (req, res) => {
  if (!req.user) {
    return res.redirect("https://todo-with-ai-alpha.vercel.app/login?error=user_not_found");
  }
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.redirect(`https://todo-with-ai-alpha.vercel.app/dashboard?token=${token}`);
};



export const Logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "user Logout success" });
  } catch (error) {
    console.log("error in the user logout: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
    try {
        if (!req.user) {
          return res.status(401).json({ message: "Unauthorized, no user found" });
        }
    
        const user = await User.findById(req.user._id).select("-password");
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        console.log("User info retrieved:", user);
        res.status(200).json({ user });
      } catch (error) {
        console.log("Error in getProfile:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};
