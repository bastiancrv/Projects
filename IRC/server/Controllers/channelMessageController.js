const channelMessageModel = require("../Models/channelMessageModel");

//createMessage
const createChannelMessage = async (req, res) => {
  const { channelId, senderId, text } = req.body;

  const channelMessage = new channelMessageModel({
    channelId,
    senderId,
    text,
  });

  try {
    const response = await channelMessage.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getMessages
const getChannelMessages = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channelMessages = await channelMessageModel.find({ channelId });
    res.status(200).json(channelMessages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createChannelMessage, getChannelMessages };
