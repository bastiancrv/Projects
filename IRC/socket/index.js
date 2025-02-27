const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("Nouvel utilisateur connecté :", socket.id);

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (data) => {
    console.log("Message reçu du client :", data);

    const recipientSocket = onlineUsers.find(
      (user) => user.userId === data.recipientId
    )?.socketId;

    if (recipientSocket) {
      io.to(recipientSocket).emit("getmessages", data); // Envoie au destinataire
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3001);
