const express = require("express");
const router = express.Router();
const users = require("../controller/Users");

router.get("/check", users.getUsers);
router.post("/register", users.register);

module.exports = router;
