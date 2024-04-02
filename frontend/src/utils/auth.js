const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = decodedToken;
    next();
  });
};

module.exports = authenticateToken;
