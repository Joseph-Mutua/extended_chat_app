const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/publics"));

const expressServer = app.listen(8000, () => {
  console.log("Server running on port 8000");
});

const io = socketio(expressServer);

//io.on = io.of("/")

//Wait for any socket to connect and respond
io.on("connection", (socket) => {
  socket.emit("messageFromServer", {
    data: "Welcome to the socketio Server!!  ",
  });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });

  socket.on("newMessageToServer", (msg) => {
    //Emit the message to all connected Clients
    io.of("/").emit("messageToClients", { text: msg.text });
  });


  //The server can still communicate across namespaces but on the
  //client the socket needs to be on that nammespace inorder to get the events

  setTimeout(() => {
    io.of("/admin").emit(
      "Server welcome",
      "Welcome to admin channel from main channel"
    );
  }, 1000);
  
});

//Admin namespace
io.of("/admin").on("connection", (socket) => {
  console.log("someone connected to the admin namespace");
  io.of("/admin").emit("welcome", "Welcome to admin Channel");
});
