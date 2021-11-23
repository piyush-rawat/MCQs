const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ error_msg: "Invalid token1." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.headers.user_id = decoded.user_id;
      return next();
    }

    return res.status(401).json({ error_msg: "Invalid token2." });
  } catch (error) {
    return res.status(401).json({ error_msg: "Invalid token3." });
  }
};
