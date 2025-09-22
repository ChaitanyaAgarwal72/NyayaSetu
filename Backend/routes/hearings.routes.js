const express = require("express");
const router = express.Router();
const hearingsController = require("../controllers/hearings.controller");
const authenticateToken = require("../middleware/authenticateToken"); // JWT middleware

// All routes require authentication
router.use(authenticateToken);

// Add new hearing with PDF upload
router.post("/add", hearingsController.addHearing);

// Get all hearings for the lawyer (across all cases)
router.get("/", hearingsController.getAllHearings);

// Get hearings by case number
router.get("/case/:caseNumber", hearingsController.getHearingsByCase);

// View/Download PDF by hearing ID
router.get("/pdf/:hearingId", hearingsController.viewPDF);

// Search hearings by name
router.get("/search/:hearingName", hearingsController.getHearingsByName);

// Get hearing by hearing ID (moved after specific routes)
router.get("/:hearingId", hearingsController.getHearingById);

// Delete hearing by ID
router.delete("/delete/:hearingId", hearingsController.deleteHearing);

// Send professional email to client
router.post("/send-client-email", hearingsController.sendClientEmail);

module.exports = router;
