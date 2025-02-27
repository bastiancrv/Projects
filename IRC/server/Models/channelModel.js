const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    titre: String,
    membres: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const channelModel = mongoose.model("Channel", channelSchema);

module.exports = channelModel;
