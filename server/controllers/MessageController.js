const MessageModel = require("../models/MessageModel");
const mongoose = require("mongoose");

async function sendMessage(req, res) {
  try {
    const { id, message } = req.body;
    const newMessage = new MessageModel({
      senderId: req.userId,
      receiverId: id,
      content: message,
    });

    await newMessage.save();

    const result = await MessageModel.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getMessages = async (req, res) => {
  try {
    const { id } = req.body; 
    const userId = req.userId;

    const messages = await MessageModel.aggregate([
      {
        $match: {
          $or: [
            {
              senderId: new mongoose.Types.ObjectId(userId),
              receiverId: new mongoose.Types.ObjectId(id),
            },
            {
              senderId: new mongoose.Types.ObjectId(id),
              receiverId: new mongoose.Types.ObjectId(userId),
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $unwind: "$sender",
      },
      {
        $lookup: {
          from: "users",
          localField: "receiverId",
          foreignField: "_id",
          as: "receiver",
        },
      },
      {
        $unwind: "$receiver",
      },
      {
        $project: {
          _id: 1,
          senderId: 1,
          senderName: "$sender.name",
          receiverId: 1,
          receiverName: "$receiver.name",
          content: 1,
          timestamp: 1,
        },
      },
    ]);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };
