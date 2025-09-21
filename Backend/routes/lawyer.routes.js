const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authenticateToken");
const lawyerController = require("../controllers/lawyer.controller");

// Get lawyer profile (protected route)
router.get("/profile", authToken, lawyerController.getProfile);

// Update lawyer profile (protected route)
router.put("/profile", authToken, lawyerController.updateProfile);

module.exports = router;
