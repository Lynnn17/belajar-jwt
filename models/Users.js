const db = require("../config/db");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

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

exports.userLogin = async (data, result, res) => {
  const sqlQuery = `SELECT * FROM users where email = "${data.email}"`;
  db.query(sqlQuery, (err, row) => {
    if (err) {
      result({ error: err }, null);
      return;
    }
    if (bcrypt.compareSync(data.password, row[0].password)) {
      const data = {
        id_user: row[0].id_user,
        name: row[0].name,
        token: row[0].token,
      };
      console.log(data);
      console.log(process.env.ACCESS_TOKEN_SECRET);
      const accesToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
      });
      const refresToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });

      let sqlQuery2 = `update users SET token ="${refresToken}" where id_user = "${data.id_user}"`;
      db.query(sqlQuery2, (err, row) => {
        if (err) {
          result({ error: err }, null);
          return;
        }

        // res.cookie("refresh_token", refresToken, {
        //   httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000,
        //   //jika https
        //   // secure : true
        // });

        // console.log(res);

        result(null, accesToken);
      });
    } else {
      res({ eror: "Data Invalid" }, null);
      return;
    }
  });
};
