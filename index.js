const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("that user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

io.on("disconnect", () => {
  console.log("a user disconnected");
});

const port = 3000;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
