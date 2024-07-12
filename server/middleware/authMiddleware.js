const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header.authotization.split(" ")[1];

    const varefied = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = varefied.id;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = auth;
