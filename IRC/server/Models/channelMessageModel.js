const mongoose = require("mongoose");

const channelMessageSchema = new mongoose.Schema(
  {
    channelId: String,
    senderId: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

const channelMessageModel = mongoose.model("ChannelMessage", channelMessageSchema);

module.exports = channelMessageModel;
