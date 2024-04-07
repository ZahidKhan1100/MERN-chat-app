const UserModel = require("../models/UserModel");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const mkdirp = promisify(require("mkdirp"));

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      throw new Error("Email Already exist");
    }

    if (!req.file) {
      throw new Error("Image is required");
    }

    const image = req.file;

    const imagePath = await saveImage(image);

    const user = new UserModel({
      name,
      email,
      password,
      image: imagePath,
    });

    await user.save();
    res.status(200).send({ message: "User added successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function saveImage(image) {
  const uploadDir = path.join(__dirname, "../uploads");
  await mkdirp(uploadDir);
  const filename = `${Date.now()}-${image.originalname}`;

  const imagePath = path.join(uploadDir, filename);
  await fs.promises.writeFile(imagePath, image.buffer);

  return "uploads/" + filename;
}

module.exports = { signUp };
