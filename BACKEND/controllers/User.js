const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  let { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ error_msg: "Email already exists." });
    }
    password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await User.create({ name, email, password });
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error_msg: "Something went wrong, please try again later." });
  }
};
