// Server-side: Node.js + Socket.io
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from public folder
app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);
    
    socket.on("message", (msg) => {
        console.log("Received:", msg);
        io.emit("message", msg); // Broadcast message to all clients
    });
    
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
