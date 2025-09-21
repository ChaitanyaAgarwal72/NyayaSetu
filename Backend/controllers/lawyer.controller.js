const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");

// Get lawyer profile
exports.getProfile = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware

    const qry =
      "SELECT lawyer_id, name, gender, email, advocate_no, mobile_no, dob, address, city, state, created_at FROM lawyers WHERE lawyer_id = ?";
    const [result] = await db.query(qry, [lawyerId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      lawyer: result[0],
    });
  } catch (err) {
    console.error("Error getting lawyer profile:", err);
    res.status(500).json({ message: "Error retrieving profile" });
  }
};

// Update lawyer information (excluding password and advocate_no)
exports.updateProfile = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { name, gender, email, mobile_no, dob, address, city, state } =
      req.body;

    // Check if lawyer exists
    const checkQuery = "SELECT * FROM lawyers WHERE lawyer_id = ?";
    const [existingLawyer] = await db.query(checkQuery, [lawyerId]);

    if (existingLawyer.length === 0) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    // Prepare update data (only include fields that are provided)
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
      // Check if new email already exists (excluding current user)
      const emailCheckQuery =
        "SELECT * FROM lawyers WHERE email = ? AND lawyer_id != ?";
      const [emailExists] = await db.query(emailCheckQuery, [email, lawyerId]);

      if (emailExists.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

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
      // Allow empty string
      updateFields.push("address = ?");
      updateValues.push(address);
    }

    if (city !== undefined) {
      // Allow empty string
      updateFields.push("city = ?");
      updateValues.push(city);
    }

    if (state !== undefined) {
      // Allow empty string
      updateFields.push("state = ?");
      updateValues.push(state);
    }

    // Check if there are fields to update
    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    // Add updated_at timestamp
    updateFields.push("updated_at = CURRENT_TIMESTAMP");

    // Add lawyer_id for WHERE clause
    updateValues.push(lawyerId);

    // Build and execute update query
    const updateQuery = `UPDATE lawyers SET ${updateFields.join(
      ", "
    )} WHERE lawyer_id = ?`;
    const [result] = await db.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to update profile" });
    }

    // Get updated lawyer data
    const getUpdatedQuery =
      "SELECT lawyer_id, name, gender, email, advocate_no, mobile_no, dob, address, city, state, updated_at FROM lawyers WHERE lawyer_id = ?";
    const [updatedLawyer] = await db.query(getUpdatedQuery, [lawyerId]);

    res.status(200).json({
      message: "Profile updated successfully",
      lawyer: updatedLawyer[0],
    });
  } catch (err) {
    console.error("Error updating lawyer profile:", err);

    // Handle specific database errors
    if (err.code === "ER_DUP_ENTRY") {
      if (err.message.includes("email")) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        res.status(400).json({ message: "Duplicate entry found" });
      }
    } else {
      res.status(500).json({ message: "Error updating profile" });
    }
  }
};
