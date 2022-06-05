const express = require("express");
const router = express.Router();
const users = require("../controller/Users");
const verify = require("../middleware/VerifyToken");
const { refreshToken } = require("../controller/RefreshToken");

router.get("/check", verify.verifyToken, users.getUsers);
router.post("/register", users.register);
router.post("/login", users.login);
router.get("/token", refreshToken);

module.exports = router;
