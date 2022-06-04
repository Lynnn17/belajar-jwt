const Users = require("../models/Users");
const bcrypt = require("bcrypt");

exports.getUsers = (req, res) => {
  Users.findUser(req, res);
};

exports.register = async (req, res) => {
  const { name, email, password, confPassword, token } = req.body;

  if (password !== confPassword)
    return res.status(400).json({
      msg: "Password dan Confirm password tidak cocok",
    });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const data = { name, email, password: hashPassword, token };

  Users.createAccount(data, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const allData = { email, password };

  Users.userLogin(allData, res, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};
