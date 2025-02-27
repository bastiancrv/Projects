const channelModel = require("../Models/channelModel");

const createChannel = async (req, res) => {
    const { titre } = req.body;

    try {
        const newChannel = new channelModel({
            titre: titre,
            membres: []
        });
        const response = await newChannel.save();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUserChannels = async (req, res) => {
    const userId = req.params.userId;

    try {
        const channels = await channelModel.find({
            membres: {$in: userId}
        })

        res.status(200).json(channels)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findChannel = async (req, res) => {
    const channelId = req.params.channelId;

    try {
        const channel = await channelModel.findById(channelId);

        res.status(200).json(channel);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const joinChannel = async (req, res) => {
    const channelId = req.params.channelId;
    const userId = req.params.userId;
  
    try {
      const channel = await channelModel.findById(channelId);
      if (!channel) return res.status(404).json({ message: "Channel non trouvé" });
  
      if (channel.membres.includes(userId)) return res.status(400).json({ message: "Utilisateur déjà membre du channel" });
  
      channel.membres.push(userId);
      const response = await channel.save();
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  

const leaveChannel = async (req, res) => {
    const channelId = req.params.channelId;
    const userId = req.params.userId;

    try {
        const channel = await channelModel.findById(channelId);
        if (!channel) return res.status(404).json({ message: "Channel non trouvé" });

        if (!channel.membres.includes(userId)) return res.status(400).json({ message: "Utilisateur n'est pas membre du channel" });

        channel.membres = channel.membres.filter(id => id !== userId);
        const response = await channel.save();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const deleteChannel = async (req, res) => {
    try {
        const channelId = req.params.channelId;
        const channel = await channelModel.findById(channelId);
        if (!channel) {
          res.status(404).send(`Channel ${channelId} non trouvé`);
          return;
        }
        await channelModel.findByIdAndDelete(channelId);
        res.status(200).send(`Channel ${channelId} supprimé avec succès`);
      } catch (error) {
        res.status(500).send(`Erreur lors de la suppression du channel : ${error.message}`);
      }
    };

const getAllChannels = async (req, res) => {
    try {
        const channels = await channelModel.find();
        res.status(200).json(channels);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { 
    createChannel, 
    findUserChannels, 
    findChannel, 
    joinChannel, 
    leaveChannel, 
    getAllChannels,
    deleteChannel
};
