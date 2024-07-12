const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    // Type 1
    // const { name, email, password } = req.body;

    // const user = new User({
    //   name,
    //   email,
    //   password,
    // });

    // const newUser = await user.save();

    // Type 2
    //const newUser = await User.create(req.body);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // const hashedPass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPass;

    const newUser = await User(req.body);
    await newUser.save();
    console.log(newUser);
    res.send({ success: true, newUser });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("User not found");
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
  res.send({ success: true, user, token });
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "You are Authorized",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "not authorized",
    });
  }
});

module.exports = router;

/// jwt is used to create a token for the user to login and logout
// jwt.sign() is used to create a token
// jwt.verify() is used to verify the token
//
