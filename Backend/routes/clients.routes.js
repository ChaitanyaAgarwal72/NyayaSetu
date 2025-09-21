const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authenticateToken");
const clientsController = require("../controllers/clients.controller");

// Add a new client (protected route)
router.post("/", authToken, clientsController.addClient);

// Get all clients for logged-in lawyer (protected route)
router.get("/", authToken, clientsController.getClients);

// Get client by name search (protected route)
router.get("/search/:clientName", authToken, clientsController.getClientByName);

// Get single client by ID (protected route)
router.get("/:clientId", authToken, clientsController.getClientById);

// Update client (protected route)
router.put("/:clientId", authToken, clientsController.updateClient);

// Delete client (protected route)
router.delete("/:clientId", authToken, clientsController.deleteClient);

module.exports = router;
