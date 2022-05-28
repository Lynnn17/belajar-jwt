const db = require("../config/db");
const bcrypt = require("bcrypt");
const { response } = require("express");

exports.findUser = (req, res) => {
  const sqlQuery = `SELECT * FROM users`;
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
  //   const sqlQuery = `INSERT INTO users Set name="${data.name}",email="${data.email}", password="${data.password}",token="${data.token}" `;
  const sqlQuery = `INSERT INTO users(name, email, password, token) VALUES ("${data.name}", "${data.email}", "${data.password}", "${data.token}");`;
  db.query(sqlQuery, (err, row) => {
    if (err) {
      res({ eror: err }, null);
      return;
    }
    res(null, { msg: "Register Berhasil" });
  });
};
