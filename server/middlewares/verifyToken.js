const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "default_secret";

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.userId = decoded._id;
      next();
    });
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
}

module.exports = verifyToken;
