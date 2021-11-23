const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const { createUser } = require("../controllers/User");

router.get("/", async (req, res) => {});
router.post(
  "/",
  [
    body("name", "Name is required.").exists(),
    body("email", "Email is required.").isEmail(),
    body("password", "Password must be atleast 6 characters long.").isLength({
      min: 6,
    }),
  ],
  createUser
);
router.put("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
