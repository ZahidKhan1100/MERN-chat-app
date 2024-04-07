const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "default_secret";
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  try {
    const { email, password } = req.body.data;
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      const passwordMatch = await bcrypt.compare(password, emailExist.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Incorrect password" });
      } else {
        const token = jwt.sign({ _id: emailExist._id }, jwtSecret);
        res.status(200).json({ message: "Login successful", token });
      }
    } else {
      res.status(401).send({ message: "Email not exist" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { login };
