const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userLogin = async (data, res, result) => {
  console.log(data);
  const sqlQuery = `SELECT * FROM users where email = "${data.email}"`;
  db.query(sqlQuery, (err, row) => {
    if (err) {
      result({ error: err }, null);
      return;
    }
    if (bcrypt.compareSync(data.password, row[0].password)) {
      const dataUser = {
        userId: row[0].id_user,
        name: row[0].name,
        email: row[0].email,
      };

      const accessToken = jwt.sign(dataUser, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
      });
      const refreshToken = jwt.sign(
        dataUser,
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      let sqlQuery2 = `update users SET token ="${refreshToken}" where id_user = "${row[0].id_user}"`;
      db.query(sqlQuery2, (err, row) => {
        if (err) {
          result({ error: err }, null);
          return;
        }

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        // res.clearCookie("refreshToken");

        result(null, { accesToken: accessToken, msg: "Login Berhasil" });
      });
    } else {
      result({ msg: "wrong password" }, null);
      return;
    }
  });
};
