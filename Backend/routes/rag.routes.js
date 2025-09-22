const express = require("express");
const router = express.Router();
const ragController = require("../controllers/rag.controller");
const authenticateToken = require("../middleware/authenticateToken"); // JWT middleware

// All routes require authentication
router.use(authenticateToken);

// Communicate with RAG service
router.post("/query", ragController.communicateWithRag);

module.exports = router;
