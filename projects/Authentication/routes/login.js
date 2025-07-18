const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", loginController.showLogin);
router.post("/", loginController.handleLogin);

module.exports = router;
