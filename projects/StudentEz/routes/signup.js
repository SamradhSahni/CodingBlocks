const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");

router.get("/", signupController.showSignup);
router.post("/", signupController.handleSignup);

module.exports = router;
