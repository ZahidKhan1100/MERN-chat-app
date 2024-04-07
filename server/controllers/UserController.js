const UserModel = require("../models/UserModel");

async function getUsers(req, res) {
  try {
    const userId = req.userId;
    const result = await UserModel.find({ _id: { $ne: userId } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.userId;
    const result = await UserModel.findById(userId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { getUsers, getUser };
