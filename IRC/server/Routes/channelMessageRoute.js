const express = require("express");
const {
  createChannelMessage,
  getChannelMessages,
} = require("../Controllers/channelMessageController");

const router = express.Router();

router.post("/", createChannelMessage);
router.get("/:channelId", getChannelMessages);

module.exports = router;
