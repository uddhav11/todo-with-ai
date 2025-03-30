import app from "./app.js";
import {createServer} from "http";
import {Server } from "socket.io";
import { checkTaskDeadlines } from "./services/taskRemainderService.js";
import cron from "node-cron";

const PORT = process.env.PORT || 4000;

const httpServer= createServer(app)
const io= new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('user conncted', socket.id) 

    socket.on('joinTaskRoom', (taskId) => {
        socket.json(`task_${taskId}`)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})

app.set('io', io)


cron.schedule('0 * * * *', () => {
    console.log('Checking task deadlines')
    checkTaskDeadlines()
})

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})