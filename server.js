const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  const ip = socket.handshake.address;
  socket.on("chat message", (msg) => {
    io.emit("chat message", { ip, msg });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("listenin on 3000");
});
