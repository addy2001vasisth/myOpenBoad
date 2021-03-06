const express = require("express"); // access
const socket = require("socket.io");

const app = express(); // intialize and server ready

app.use(express.static("public"));
let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log("LISTENING TO PORT " + port);
});

let io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection");
// 
  // recieved data
  socket.on("beginPath", (data) => {
    // data -> data from front end

    // transfer data to all connected computers

    io.sockets.emit("beginPath", data);
  });

  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });

  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  });
});
