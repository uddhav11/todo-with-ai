import express from "express";
import {
  register,
  login,
  Logout,
  googleCallback,
  getProfile,
} from "../controllers/authController.js";
import passport from "passport";

import { generateTokenAndSetCookies } from "../middleware/generateCookie.js";
import { ProtectRoute } from "../middleware/authMiddleware.js";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", Logout);
router.get("/profile", ProtectRoute, getProfile);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   async (req, res) => {
//     try {
//       generateTokenAndSetCookies(req.user._id, res);
//       res.redirect("http://localhost:5173/dashboard"); // Redirect to frontend
//     } catch (error) {
//       console.error("Google login error:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   }
// );

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const token = generateTokenAndSetCookies(req.user._id, res); // Generate token
      const user = req.user; // Get user details

      // #########################this works=> 
          // await sendEmail(
          //   user?.email || 'jyotiadhikari318@gmail.com',
          //   "Welcome to Task Manager",
          //   `Hi ${user.name}, Welcome to Task Manager! Start managing your tasks now!`
          // );

      // Redirect with token & user data in the URL
      res.redirect(
        `http://localhost:5173/dashboard?token=${token}&user=${encodeURIComponent(
          JSON.stringify(user)
        )}`
      );
    } catch (error) {
      console.error("Google login error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);



// router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

export default router;
