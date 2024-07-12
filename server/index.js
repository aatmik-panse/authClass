const express = require("express");
var cors = require("cors");

require("dotenv").config();

const dbConfig = require("./config/dbConfig");

const app = express();

const userRoutes = require("./routes/userRoutes");
const auth = require("./middleware/authMiddleware");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use(auth);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log("server running");
});
