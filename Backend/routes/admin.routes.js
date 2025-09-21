const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// sign-up
router.post("/", adminController.create);
// login
router.post("/login", adminController.login);
//forgot password, send otp
router.post("/forgotPassword", adminController.forgotPasswordOTP);
//update the password
router.post("/updatePassword", adminController.verifyOTPAndResetPassword);
//export the routes
module.exports = router;
