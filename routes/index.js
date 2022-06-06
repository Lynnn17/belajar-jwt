const express = require("express");
const router = express.Router();
const users = require("../controller/Users");
const login = require("../controller/Login");
const verify = require("../middleware/VerifyToken");
const { refreshToken } = require("../controller/RefreshToken");

router.get("/check", verify.verifyToken, users.getUsers);
router.post("/register", users.register);
router.post("/login", login.loginUser);
router.get("/token", refreshToken);

module.exports = router;
