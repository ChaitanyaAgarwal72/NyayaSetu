const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authenticateToken");
const casesController = require("../controllers/cases.controller");

// Add a new case (protected route)
router.post("/", authToken, casesController.addCase);

// Get all cases for logged-in lawyer (protected route)
router.get("/", authToken, casesController.getCases);

// Search cases by case number (protected route)
router.get(
  "/case-number/:caseNumber",
  authToken,
  casesController.getCaseByCaseNumber
);

// Search cases by case title (protected route)
router.get("/title/:caseTitle", authToken, casesController.getCasesByTitle);

// Search cases by court name (protected route)
router.get("/court/:courtName", authToken, casesController.getCasesByCourt);

// Search cases by case type (protected route)
router.get("/type/:caseType", authToken, casesController.getCasesByType);

// Search cases by client name (protected route)
router.get(
  "/client/:clientName",
  authToken,
  casesController.getCasesByClientName
);

// Get single case by ID (protected route)
router.get("/:caseId", authToken, casesController.getCaseById);

// Update case by case number (protected route)
router.put(
  "/case-number/:caseNumber",
  authToken,
  casesController.updateCaseByCaseNumber
);

// Delete case by case number (protected route)
router.delete(
  "/case-number/:caseNumber",
  authToken,
  casesController.deleteCaseByCaseNumber
);

module.exports = router;
