const options = {
  cors: {
    origin: ["http://localhost:3000"],
  },
};

const io = require("socket.io")(5000, options);
io.on("connection", (socket) => {
  socket.on("newMessage", (res, room) => {
    if (room) {
      return socket.broadcast.emit("received-room", res, room);
    }
    socket.broadcast.emit("received", res);
  });
});
