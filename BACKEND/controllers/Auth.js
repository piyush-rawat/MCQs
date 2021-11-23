const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const User = require("../models/User");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ error_msg: "Invalid Credentials." });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.json({ error_msg: "Invalid Credentials." });
    }
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.json({ error_msg: "Server Error" });
  }
};

exports.authenticateGoogleToken = async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  try {
    let user = await User.findOne({ email }).select("-password");

    if (!user) {
      user = await User.create({ name, email, picture });
      user = user.toObject();
      const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      user.token = token;
      return res.json({ user });
    } else {
      if (!user.picture || user.picture.toString() != picture.toString()) {
        user.picture = picture;
        await user.save();
        user = user.toObject();
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        user.token = token;
        return res.json({ user });
      }
      user = user.toObject();
      const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600000,
      });
      user.token = token;
      return res.json({ user });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error_msg: "Server Error" });
  }
};

exports.getUser = async (req, res) => {
  const user_id = req.headers.user_id;
  try {
    let user = await User.findById({ _id: user_id.toString() }).select(
      "-password"
    );
    if (user) {
      return res.json({ user });
    }
    return res.status(201).json({ error_msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ error_msg: "Unauthorized" });
  }
};
