import express from "express"
import dotenv from "dotenv"
dotenv.config();
import fileUpload from "express-fileupload"
// import { use } from "react";
import { mainRouter } from "./routes/main.routes.js";
import path from "path"
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors"

const app = express();
app.use("/profileImage",express.static(path.join(process.cwd(), "uploads")))
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use("/api",mainRouter)

let users={}

let httpServer=createServer(app);
let io = new Server(httpServer,{
    cors: {origin: "*"}
});
io.on("connection",(socket)=>{
    socket.on("new user", ({username})=>{
        users[username]=socket.id;
        io.emit("connected", {username});
    });
    socket.on("new message", (message) => {
    io.emit("message", { from: message.from, val: message.message });
});
})
let PORT = process.env.PORT || 3000;
httpServer.listen(PORT, ()=> console.log(`Server is running on ${PORT}-port`));