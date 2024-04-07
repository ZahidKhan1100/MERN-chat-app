const express = require("express");
const SignUpController = require("../controllers/SignUpController");
const LoginController = require("../controllers/LoginController");
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const UserController = require("../controllers/UserController");
const MessageController = require("../controllers/MessageController");

const router = express.Router();
const upload = multer();

router.use((req, res, next) => {
  if (req.path === "/signup" || req.path === "/login") {
    next();
  } else {
    verifyToken(req, res, next);
  }
});

router.route("/signup").post(upload.single("image"), SignUpController.signUp);
router.route("/login").post(LoginController.login);
router.route("/get-users").get(UserController.getUsers);
router.route("/get-user").get(UserController.getUser);
router.route("/send-message").post(MessageController.sendMessage);
router.route("/get-messages").post(MessageController.getMessages);


module.exports = router;
