const express = require("express");
const router = express.Router();

const {
  loginUser,
  authenticateGoogleToken,
  getUser,
} = require("../controllers/Auth");

const authenticate = require("../middlewares/authenticate");

router.post("/login", loginUser);

router.post("/google", authenticateGoogleToken);

router.get("/getUser", authenticate, getUser);

module.exports = router;
