const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const channelRoute = require("./Routes/channelRoute");
const messageRoute = require("./Routes/messageRoute");
const channelMessageRoute = require("./Routes/channelMessageRoute");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/channels", channelRoute);
app.use("/api/channelMessages", channelMessageRoute);
app.use("/api/messages", messageRoute);

// Servir l'application React construite
app.use(express.static(path.join(__dirname, "../client/dist")));

// Route pour gérer toutes les autres demandes et renvoyer l'index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Welcome to our chat app APIs..");
});

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));
