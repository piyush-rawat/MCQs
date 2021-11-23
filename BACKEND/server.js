if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}

// Connect Database
require("./config/db")();

const express = require("express");
const path = require("path");

const app = express();

// Set React Build Folder to serve static files.
app.use(express.static("public"));

// express's build-in bodyparser middleware.
app.use(express.json());

// Backend API Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/_exam", require("./routes/exam"));
app.use("/_results", require("./routes/results"));

// Send React Prodction Build HTML File.
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Server Running"));
