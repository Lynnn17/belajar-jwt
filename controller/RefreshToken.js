const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

exports.refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    Users.userBytoken(refreshToken, req, res);
  } catch (err) {
    console.log(err);
  }
};
