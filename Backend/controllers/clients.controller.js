const db = require("../utils/db");

// Add a new client (lawyer_id from JWT token)
exports.addClient = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const {
      name,
      gender,
      email,
      mobile_no,
      dob,
      address,
      city,
      state,
      language,
    } = req.body;

    // Validation
    if (!name || !gender || !email || !mobile_no || !dob || !language) {
      return res.status(400).json({
        message:
          "Name, gender, email, mobile number, date of birth and language are required",
      });
    }

    // Validate gender
    if (!["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({
        message: "Gender must be Male, Female, or Other",
      });
    }

    // Check if client email already exists (globally unique)
    const checkEmailQuery = "SELECT * FROM clients WHERE email = ?";
    const [existingClient] = await db.query(checkEmailQuery, [email]);

    if (existingClient.length > 0) {
      return res.status(400).json({
        message: "Client with this email already exists",
      });
    }

    const insertQuery = `
      INSERT INTO clients (
        lawyer_id, name, gender, email, mobile_no, dob, address, city, state, language
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      lawyerId,
      name,
      gender,
      email,
      mobile_no,
      dob,
      address,
      city,
      state,
      language,
    ];

    const [result] = await db.query(insertQuery, values);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to add client" });
    }

    // Get the newly added client
    const getClientQuery = "SELECT * FROM clients WHERE client_id = ?";
    const [newClient] = await db.query(getClientQuery, [result.insertId]);

    res.status(201).json({
      message: "Client added successfully",
      client: newClient[0],
    });
  } catch (err) {
    console.error("Error adding client:", err);
    if (err.code === "ER_DUP_ENTRY") {
      res
        .status(400)
        .json({ message: "Client with this email already exists" });
    } else {
      res.status(500).json({ message: "Error adding client" });
    }
  }
};

// Get all clients for the logged-in lawyer
exports.getClients = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware

    const query = `
      SELECT * FROM clients 
      WHERE lawyer_id = ? 
      ORDER BY created_at DESC
    `;

    const [clients] = await db.query(query, [lawyerId]);

    res.status(200).json({
      message: "Clients retrieved successfully",
      count: clients.length,
      clients: clients,
    });
  } catch (err) {
    console.error("Error getting clients:", err);
    res.status(500).json({ message: "Error retrieving clients" });
  }
};

// Get client by name (search functionality)
exports.getClientByName = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { clientName } = req.params;

    if (!clientName) {
      return res.status(400).json({ message: "Client name is required" });
    }

    const query = `
      SELECT * FROM clients 
      WHERE lawyer_id = ? AND name LIKE ?
      ORDER BY created_at DESC
    `;

    // Use LIKE for partial name matching
    const searchTerm = `%${clientName}%`;
    const [clients] = await db.query(query, [lawyerId, searchTerm]);

    if (clients.length === 0) {
      return res.status(404).json({
        message: "No clients found with that name",
      });
    }

    res.status(200).json({
      message: "Clients found successfully",
      count: clients.length,
      clients: clients,
    });
  } catch (err) {
    console.error("Error searching clients:", err);
    res.status(500).json({ message: "Error searching clients" });
  }
};

// Get single client by ID
exports.getClientById = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { clientId } = req.params;

    const query = "SELECT * FROM clients WHERE client_id = ? AND lawyer_id = ?";
    const [client] = await db.query(query, [clientId, lawyerId]);

    if (client.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Client retrieved successfully",
      client: client[0],
    });
  } catch (err) {
    console.error("Error getting client:", err);
    res.status(500).json({ message: "Error retrieving client" });
  }
};

// Update client (all fields can be updated)
exports.updateClient = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { clientId } = req.params;
    const { name, gender, email, mobile_no, dob, address, city, state } =
      req.body;

    // Check if client exists and belongs to this lawyer
    const checkQuery =
      "SELECT * FROM clients WHERE client_id = ? AND lawyer_id = ?";
    const [existingClient] = await db.query(checkQuery, [clientId, lawyerId]);

    if (existingClient.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    // If email is being updated, check for duplicates (globally unique)
    if (email && email !== existingClient[0].email) {
      const emailCheckQuery =
        "SELECT * FROM clients WHERE email = ? AND client_id != ?";
      const [emailExists] = await db.query(emailCheckQuery, [email, clientId]);

      if (emailExists.length > 0) {
        return res
          .status(400)
          .json({ message: "Client with this email already exists" });
      }
    }

    // Prepare update fields
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }

    if (gender && ["Male", "Female", "Other"].includes(gender)) {
      updateFields.push("gender = ?");
      updateValues.push(gender);
    }

    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }

    if (mobile_no) {
      updateFields.push("mobile_no = ?");
      updateValues.push(mobile_no);
    }

    if (dob) {
      updateFields.push("dob = ?");
      updateValues.push(dob);
    }

    if (address !== undefined) {
      updateFields.push("address = ?");
      updateValues.push(address);
    }

    if (city !== undefined) {
      updateFields.push("city = ?");
      updateValues.push(city);
    }

    if (state !== undefined) {
      updateFields.push("state = ?");
      updateValues.push(state);
    }

    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    // Add updated_at timestamp
    updateFields.push("updated_at = CURRENT_TIMESTAMP");

    // Add client_id and lawyer_id for WHERE clause
    updateValues.push(clientId, lawyerId);

    const updateQuery = `
      UPDATE clients 
      SET ${updateFields.join(", ")} 
      WHERE client_id = ? AND lawyer_id = ?
    `;

    const [result] = await db.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to update client" });
    }

    // Get updated client data
    const getUpdatedQuery =
      "SELECT * FROM clients WHERE client_id = ? AND lawyer_id = ?";
    const [updatedClient] = await db.query(getUpdatedQuery, [
      clientId,
      lawyerId,
    ]);

    res.status(200).json({
      message: "Client updated successfully",
      client: updatedClient[0],
    });
  } catch (err) {
    console.error("Error updating client:", err);
    if (err.code === "ER_DUP_ENTRY") {
      res
        .status(400)
        .json({ message: "Client with this email already exists" });
    } else {
      res.status(500).json({ message: "Error updating client" });
    }
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { clientId } = req.params;

    // Check if client exists and belongs to this lawyer
    const checkQuery =
      "SELECT * FROM clients WHERE client_id = ? AND lawyer_id = ?";
    const [existingClient] = await db.query(checkQuery, [clientId, lawyerId]);

    if (existingClient.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Delete the client
    const deleteQuery =
      "DELETE FROM clients WHERE client_id = ? AND lawyer_id = ?";
    const [result] = await db.query(deleteQuery, [clientId, lawyerId]);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to delete client" });
    }

    res.status(200).json({
      message: "Client deleted successfully",
      deletedClient: existingClient[0],
    });
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ message: "Error deleting client" });
  }
};
