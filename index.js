const express = require("express");
const port = 3001;
const morgan = require("morgan"); //loging
const cors = require("cors");
const bodyParser = require("body-parser");
const users = require("./routes/index");

const app = express();

app.use(
  morgan("combained", {
    skip: (req, res) => {
      return res.statusCode < 400;
    },
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", users);

app.get("/", (req, res) => {
  console.log("/");
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Server Run Di: http://localhost/${port}`);
});
