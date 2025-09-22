const db = require("../utils/db");

// Add a new case (lawyer_id from JWT token)
exports.addCase = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const {
      client_id,
      case_number,
      case_title,
      court_name,
      case_type,
      filing_date,
      status = "Pending", // Default status
      description,
    } = req.body;

    // Validation
    if (
      !client_id ||
      !case_number ||
      !case_title ||
      !court_name ||
      !case_type ||
      !filing_date
    ) {
      return res.status(400).json({
        message:
          "Client ID, case number, case title, court name, case type, and filing date are required",
      });
    }

    // Validate status
    const validStatuses = [
      "Pending",
      "Ongoing",
      "Reserved for Judgment",
      "Disposed",
      "Appeal Filed",
      "Closed",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be one of: " + validStatuses.join(", "),
      });
    }

    // Check if client belongs to this lawyer
    const clientCheckQuery =
      "SELECT * FROM clients WHERE client_id = ? AND lawyer_id = ?";
    const [clientExists] = await db.query(clientCheckQuery, [
      client_id,
      lawyerId,
    ]);

    if (clientExists.length === 0) {
      return res.status(400).json({
        message: "Client not found or does not belong to this lawyer",
      });
    }

    // Check if case number already exists
    const checkCaseNumberQuery = "SELECT * FROM cases WHERE case_number = ?";
    const [existingCase] = await db.query(checkCaseNumberQuery, [case_number]);

    if (existingCase.length > 0) {
      return res.status(400).json({
        message: "Case with this case number already exists",
      });
    }

    const insertQuery = `
      INSERT INTO cases (
        lawyer_id, client_id, case_number, case_title, court_name, 
        case_type, filing_date, status, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      lawyerId,
      client_id,
      case_number,
      case_title,
      court_name,
      case_type,
      filing_date,
      status,
      description,
    ];

    const [result] = await db.query(insertQuery, values);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to add case" });
    }

    // Get the newly added case with client information
    const getCaseQuery = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.case_id = ?
    `;
    const [newCase] = await db.query(getCaseQuery, [result.insertId]);

    res.status(201).json({
      message: "Case added successfully",
      case: newCase[0],
    });
  } catch (err) {
    console.error("Error adding case:", err);
    if (err.code === "ER_DUP_ENTRY") {
      res
        .status(400)
        .json({ message: "Case with this case number already exists" });
    } else {
      res.status(500).json({ message: "Error adding case" });
    }
  }
};

// Get all cases for the logged-in lawyer
exports.getCases = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware

    const query = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.lawyer_id = ? 
      ORDER BY c.created_at DESC
    `;

    const [cases] = await db.query(query, [lawyerId]);

    res.status(200).json({
      message: "Cases retrieved successfully",
      count: cases.length,
      cases: cases,
    });
  } catch (err) {
    console.error("Error getting cases:", err);
    res.status(500).json({ message: "Error retrieving cases" });
  }
};

// Get case by ID
exports.getCaseById = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { caseId } = req.params;

    const query = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.case_id = ? AND c.lawyer_id = ?
    `;
    const [caseData] = await db.query(query, [caseId, lawyerId]);

    if (caseData.length === 0) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json({
      message: "Case retrieved successfully",
      case: caseData[0],
    });
  } catch (err) {
    console.error("Error getting case:", err);
    res.status(500).json({ message: "Error retrieving case" });
  }
};

// Get case by case number
exports.getCaseByCaseNumber = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { caseNumber } = req.params;

    if (!caseNumber) {
      return res.status(400).json({ message: "Case number is required" });
    }

    const query = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.case_number = ? AND c.lawyer_id = ?
    `;

    const [caseData] = await db.query(query, [caseNumber, lawyerId]);

    if (caseData.length === 0) {
      return res.status(404).json({
        message: "Case not found with this case number",
      });
    }

    res.status(200).json({
      message: "Case found successfully",
      case: caseData[0],
    });
  } catch (err) {
    console.error("Error searching case by number:", err);
    res.status(500).json({ message: "Error searching case" });
  }
};

// Search cases by case title
exports.getCasesByTitle = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { caseTitle } = req.params;

    if (!caseTitle) {
      return res.status(400).json({ message: "Case title is required" });
    }

    const query = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.lawyer_id = ? AND c.case_title LIKE ?
      ORDER BY c.created_at DESC
    `;

    const searchTerm = `%${caseTitle}%`;
    const [cases] = await db.query(query, [lawyerId, searchTerm]);

    if (cases.length === 0) {
      return res.status(404).json({
        message: "No cases found with that title",
      });
    }

    res.status(200).json({
      message: "Cases found successfully",
      count: cases.length,
      cases: cases,
    });
  } catch (err) {
    console.error("Error searching cases by title:", err);
    res.status(500).json({ message: "Error searching cases" });
  }
};

// Search cases by court name
exports.getCasesByCourt = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { courtName } = req.params;

    if (!courtName) {
      return res.status(400).json({ message: "Court name is required" });
    }

    const query = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.lawyer_id = ? AND c.court_name LIKE ?
      ORDER BY c.created_at DESC
    `;

    const searchTerm = `%${courtName}%`;
    const [cases] = await db.query(query, [lawyerId, searchTerm]);

    if (cases.length === 0) {
      return res.status(404).json({
        message: "No cases found in that court",
      });
    }

    res.status(200).json({
      message: "Cases found successfully",
      count: cases.length,
      cases: cases,
    });
  } catch (err) {
    console.error("Error searching cases by court:", err);
    res.status(500).json({ message: "Error searching cases" });
  }
};

// Search cases by case type
exports.getCasesByType = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { caseType } = req.params;

    if (!caseType) {
      return res.status(400).json({ message: "Case type is required" });
    }

    const query = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.lawyer_id = ? AND c.case_type LIKE ?
      ORDER BY c.created_at DESC
    `;

    const searchTerm = `%${caseType}%`;
    const [cases] = await db.query(query, [lawyerId, searchTerm]);

    if (cases.length === 0) {
      return res.status(404).json({
        message: "No cases found of that type",
      });
    }

    res.status(200).json({
      message: "Cases found successfully",
      count: cases.length,
      cases: cases,
    });
  } catch (err) {
    console.error("Error searching cases by type:", err);
    res.status(500).json({ message: "Error searching cases" });
  }
};

// Search cases by client name
exports.getCasesByClientName = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { clientName } = req.params;

    if (!clientName) {
      return res.status(400).json({ message: "Client name is required" });
    }

    const query = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.lawyer_id = ? AND cl.name LIKE ?
      ORDER BY c.created_at DESC
    `;

    const searchTerm = `%${clientName}%`;
    const [cases] = await db.query(query, [lawyerId, searchTerm]);

    if (cases.length === 0) {
      return res.status(404).json({
        message: "No cases found for that client",
      });
    }

    res.status(200).json({
      message: "Cases found successfully",
      count: cases.length,
      cases: cases,
    });
  } catch (err) {
    console.error("Error searching cases by client name:", err);
    res.status(500).json({ message: "Error searching cases" });
  }
};

// Update case by case number
exports.updateCaseByCaseNumber = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { caseNumber } = req.params;
    const {
      client_id,
      case_title,
      court_name,
      case_type,
      filing_date,
      status,
      description,
    } = req.body;

    // Check if case exists and belongs to this lawyer
    const checkQuery = `
      SELECT * FROM cases 
      WHERE case_number = ? AND lawyer_id = ?
    `;
    const [existingCase] = await db.query(checkQuery, [caseNumber, lawyerId]);

    if (existingCase.length === 0) {
      return res.status(404).json({ message: "Case not found" });
    }

    // If client_id is being updated, check if client belongs to this lawyer
    if (client_id && client_id !== existingCase[0].client_id) {
      const clientCheckQuery =
        "SELECT * FROM clients WHERE client_id = ? AND lawyer_id = ?";
      const [clientExists] = await db.query(clientCheckQuery, [
        client_id,
        lawyerId,
      ]);

      if (clientExists.length === 0) {
        return res.status(400).json({
          message: "Client not found or does not belong to this lawyer",
        });
      }
    }

    // Prepare update fields
    const updateFields = [];
    const updateValues = [];

    if (client_id) {
      updateFields.push("client_id = ?");
      updateValues.push(client_id);
    }

    if (case_title) {
      updateFields.push("case_title = ?");
      updateValues.push(case_title);
    }

    if (court_name) {
      updateFields.push("court_name = ?");
      updateValues.push(court_name);
    }

    if (case_type) {
      updateFields.push("case_type = ?");
      updateValues.push(case_type);
    }

    if (filing_date) {
      updateFields.push("filing_date = ?");
      updateValues.push(filing_date);
    }

    if (status) {
      const validStatuses = [
        "Pending",
        "Ongoing",
        "Reserved for Judgment",
        "Disposed",
        "Appeal Filed",
        "Closed",
      ];
      if (validStatuses.includes(status)) {
        updateFields.push("status = ?");
        updateValues.push(status);
      }
    }

    if (description !== undefined) {
      updateFields.push("description = ?");
      updateValues.push(description);
    }

    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    // Add updated_at timestamp
    updateFields.push("updated_at = CURRENT_TIMESTAMP");

    // Add case_number and lawyer_id for WHERE clause
    updateValues.push(caseNumber, lawyerId);

    const updateQuery = `
      UPDATE cases 
      SET ${updateFields.join(", ")} 
      WHERE case_number = ? AND lawyer_id = ?
    `;

    const [result] = await db.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to update case" });
    }

    // Get updated case data with client information
    const getUpdatedQuery = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.case_number = ? AND c.lawyer_id = ?
    `;
    const [updatedCase] = await db.query(getUpdatedQuery, [
      caseNumber,
      lawyerId,
    ]);

    res.status(200).json({
      message: "Case updated successfully",
      case: updatedCase[0],
    });
  } catch (err) {
    console.error("Error updating case:", err);
    res.status(500).json({ message: "Error updating case" });
  }
};

// Delete case by case number
exports.deleteCaseByCaseNumber = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { caseNumber } = req.params;

    // Check if case exists and belongs to this lawyer
    const checkQuery = `
      SELECT c.*, cl.name as client_name 
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.case_number = ? AND c.lawyer_id = ?
    `;
    const [existingCase] = await db.query(checkQuery, [caseNumber, lawyerId]);

    if (existingCase.length === 0) {
      return res.status(404).json({ message: "Case not found" });
    }

    // Delete the case
    const deleteQuery =
      "DELETE FROM cases WHERE case_number = ? AND lawyer_id = ?";
    const [result] = await db.query(deleteQuery, [caseNumber, lawyerId]);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to delete case" });
    }

    res.status(200).json({
      message: "Case deleted successfully",
      deletedCase: existingCase[0],
    });
  } catch (err) {
    console.error("Error deleting case:", err);
    res.status(500).json({ message: "Error deleting case" });
  }
};
