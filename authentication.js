const jwt = require("jsonwebtoken");
const User = require("./User");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).send({ error: "Invalid token" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = auth;
