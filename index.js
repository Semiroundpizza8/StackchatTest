const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", async (req, res) => {
  const messages = await getAllMessages();
  res.send(messages);
});

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  socket.on("sendMessage", ({ author, content }) => {
    io.emit("getMessage", {
      author,
      content,
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("listening on *:", PORT);
});
