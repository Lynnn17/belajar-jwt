const Login = require("../models/Login");

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const allData = { email, password };

  Login.userLogin(allData, res, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};
