// import app from "./app.js";
// import {createServer} from "http";
// import {Server } from "socket.io";
// import { checkTaskDeadlines } from "./services/taskRemainderService.js";
// import cron from "node-cron";
// import path from "path";
// import express from "express";

// const PORT = process.env.PORT || 4000;
// const __dirname= path.resolve();

// const httpServer= createServer(app)
// const io= new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//         credentials: true,
//     }
// })

// const userSockets= {}

// io.on('connection', (socket) => {
//     // console.log('user conncted', socket.id) 

//     // socket.on('joinTaskRoom', (taskId) => {
//     //     socket.join(`task_${taskId}`)
//     //     console.log(`User ${socket.id} joinde room task_${taskId}`)
//     // })

//     // socket.on('disconnect', () => {
//     //     console.log('user disconnected', socket.id)
//     // })

//     const userId= socket.handshake.auth.userId;
//     if(userId){
//         socket.join(`user_${userId}`)
//         userSockets[userId]= socket.id;
//     }

//     socket.on('disconnect', () => {
//         if(userId) delete userSockets[userId]
//     })
// })

// app.set('io', io)


// cron.schedule('0 * * * *', () => {
//     console.log('Checking task deadlines')
//     checkTaskDeadlines()
// })

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "/frontend/dist")))

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//     })
// }

// httpServer.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })


import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { checkTaskDeadlines } from "./services/taskRemainderService.js";
import cron from "node-cron";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";




const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const production_frontend_url= process.env.FRONTEND_URL || "https://todo-with-ai-alpha.vercel.app";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [production_frontend_url, "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSockets = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  if (userId) {
    socket.join(`user_${userId}`);
    userSockets[userId] = socket.id;
  }

  socket.on("disconnect", () => {
    if (userId) delete userSockets[userId];
  });
});

app.set("io", io);

// Cron Job
cron.schedule("0 * * * *", () => {
  console.log("Checking task deadlines...");
  checkTaskDeadlines();
});

// Serve frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
//   );
// }

httpServer.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
