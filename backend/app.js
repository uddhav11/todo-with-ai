// // import dotenv from "dotenv";

// import * as dotenv from 'dotenv';
// dotenv.config();

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { Server } from "socket.io";
// import http from "http";
// import passport from "passport";
// import session from "express-session";
// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// // dotenv.config();

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
// }))
// app.use(passport.initialize());
// app.use(passport.session());

// // Database Connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Routes
// app.use("/api/auth",authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/ai", aiRoutes);

// export default app;




// import * as dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import passport from "passport";
// import "./config/passport.js"; 

// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// // import aiRoutes from "./routes/aiRoutes.js";

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL ||"http://localhost:5173", 
//     credentials: true,
//   })
// );

// // app.use(cors())

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "default_secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV=== 'production', // Set to true in production with HTTPS
//       httpOnly: true,
//     },
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Database Connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// // app.use("/api/ai", aiRoutes);

// export default app;



import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import MongoStore from 'connect-mongo';


import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "https://todo-with-ai-alpha.vercel.app",
//     credentials: true,
//   })
// );



const allowedOrigins = ['https://todo-with-ai-alpha.vercel.app', 'http://localhost:5173'];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // important if you are using cookies or Authorization headers
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
