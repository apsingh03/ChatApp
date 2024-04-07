require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// socket.io
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New SOCKET Connection");

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });

  // socket.broadcast() => send to everyone expect msg sender
  // socket.emit => sends only to msg sender
  // but for chat we will send to comp it not only socket

  // socket.on("message", ({ message , id }) => {
  //   io.emit("sendMessage" ,  {user: "user[id]" , message , id }  );
  // });

  // socket.emit("welcome", { user: "admin", message: "Welcome to the chat" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CORS_FRONTEND_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors());

const userRoutes = require("./routes/usersRoute");

app.use("/users", userRoutes);
// actually we use app.listen() but we are using sockets so we have to use server.listen()
server.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on PORT ${process.env.PORT} `);
});

// Make io globally available
global.io = io;
