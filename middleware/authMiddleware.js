const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ msg: "No token" });

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};