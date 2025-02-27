const express = require("express");
const { createChannel, findUserChannels, findChannel, joinChannel, leaveChannel, getAllChannels, deleteChannel } = require("../Controllers/channelController");

const router = express.Router();

router.post("/", createChannel);
router.get("/user/:userId", findUserChannels);
router.get("/:channelId", findChannel);
router.post("/:channelId/join/:userId", joinChannel);
router.delete('/:channelId/leave/:userId', leaveChannel);
router.get("/", getAllChannels);
router.delete("/:channelId", deleteChannel);


module.exports = router;
