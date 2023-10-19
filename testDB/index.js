const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
require("./connectDB");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 6000;

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const initRouters = require("./src/routers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouters(app);

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("send_message", (data) => {
        console.log(data);
        socket.broadcast.emit("receive_message", data);
    });
});

server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
