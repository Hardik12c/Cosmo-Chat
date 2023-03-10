const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token =req.headers.authorization;
  if (!token) {
    res.status(401).send({ error: "Please authenticate with a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Please authenticate with a valid token");
  }
};

module.exports = fetchUser;
