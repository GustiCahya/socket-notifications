import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
}

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });
  socket.on("sendNotification", ({receiverName, senderName, action}) => {
    const receiver = getUser(receiverName);
    if(receiver){
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        action
      });
    }
  })
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

setInterval(() => {
  console.log(onlineUsers);
}, 1000)

io.listen(5000);
