const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.findUser = (req, res) => {
  const sqlQuery = `SELECT id_user,name,email FROM users`;
  db.query(sqlQuery, (err, row) => {
    if (err) {
      console.log(err);
      res.json({ erro: err.code });
      return;
    }
    res.json({ status: 200, payload: row });
  });
};

exports.createAccount = (data, res) => {
  const sqlQuery = `INSERT INTO users(name, email, password, token) VALUES ("${data.name}", "${data.email}", "${data.password}", "${data.token}");`;
  db.query(sqlQuery, (err, row) => {
    if (err) {
      res({ eror: err }, null);
      return;
    }
    res(null, { msg: "Register Berhasil" });
  });
};

exports.userBytoken = (refreshToken, req, res) => {
  const sqlQuery = `SELECT id_user,name,email FROM users where token = "${refreshToken}"`;
  db.query(sqlQuery, (err, row) => {
    if (err) {
      console.log(err);
      res.json({ erro: err.code });
      return;
    }
    if (!row[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const data = {
          userId: row[0].id_user,
          name: row[0].name,
          email: row[0].email,
        };

        accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15s",
        });
        res.json({ "access token": accessToken, Data: data });
      }
    );
    // res.json({ status: 200, payload: row });
  });
};
