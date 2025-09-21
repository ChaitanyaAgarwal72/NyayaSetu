const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Check if the error is due to token expiration
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token has expired", expiredAt: err.expiredAt });
      }
      return res.status(403).json({ message: "Token is not valid" });
    }

    // Attach the user payload to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
