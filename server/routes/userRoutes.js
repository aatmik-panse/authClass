const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();

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
    return res.status(400).send("Invalid password");
  }
  res.send("Logged in");
});

module.exports = router;
