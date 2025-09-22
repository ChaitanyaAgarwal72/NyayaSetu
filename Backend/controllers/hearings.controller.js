const db = require("../utils/db");
const multer = require("multer");
const { sendEmail } = require("../utils/mailService");
// Multer configuration for memory storage (files stored in database)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});
// Add new hearing with PDF upload
exports.addHearing = [
  upload.single("hearing_pdf"),
  async (req, res) => {
    try {
      const lawyerId = req.user.id; // From JWT token middleware
      const { case_number, hearing_name } = req.body;

      // Validation
      if (!case_number || !hearing_name) {
        return res.status(400).json({
          message: "Case Number and hearing name are required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "PDF file is required",
        });
      }

      // Check if case belongs to this lawyer
      const caseCheckQuery = `
        SELECT * FROM cases 
        WHERE case_number = ? AND lawyer_id = ?
      `;
      const [caseExists] = await db.query(caseCheckQuery, [
        case_number,
        lawyerId,
      ]);

      if (caseExists.length === 0) {
        return res.status(400).json({
          message: "Case not found or does not belong to this lawyer",
        });
      }

      // Save hearing data to database with PDF as LONGBLOB
      const insertQuery = `
        INSERT INTO case_hearings (
          case_number, hearing_name, hearing_pdf
        ) VALUES (?, ?, ?)
      `;

      const values = [
        case_number,
        hearing_name,
        req.file.buffer, // Store PDF directly as LONGBLOB
      ];

      console.log("Adding case hearing");

      const [result] = await db.query(insertQuery, values);

      if (result.affectedRows === 0) {
        return res.status(500).json({ message: "Failed to add hearing" });
      }

      console.log("Case Hearing Added");

      const hearingId = result.insertId;

      // Call external API to store hearing
      try {
        const apiResponse = await fetch(
          "http://localhost:5000/nyayasetu/store/hearing",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              case_number: case_number,
            },
            body: JSON.stringify({
              hearing_id: hearingId,
              hearing_name: hearing_name,
              case_number: case_number,
            }),
          }
        );

        if (!apiResponse.ok) {
          console.error(
            "API call failed:",
            apiResponse.status,
            apiResponse.statusText
          );
        }
      } catch (apiError) {
        console.error("Error calling external API:", apiError.message);
        // Continue execution even if API call fails
      }

      return res.status(201).json({
        message: "Hearing added successfully",
        hearing: {
          hearing_id: hearingId,
          case_number: case_number,
          hearing_name: hearing_name,
        },
      });
    } catch (err) {
      console.error("Error adding hearing:", err);
      res.status(500).json({
        message: "Error adding hearing",
        error: err.message,
      });
    }
  },
];

// Get all hearings for a specific case using case_number
exports.getHearingsByCase = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { caseNumber } = req.params; // Changed from caseId to caseNumber

    // Check if case belongs to this lawyer using case_number
    const caseCheckQuery = `
      SELECT * FROM cases 
      WHERE case_number = ? AND lawyer_id = ?
    `;
    const [caseExists] = await db.query(caseCheckQuery, [caseNumber, lawyerId]);

    if (caseExists.length === 0) {
      return res.status(400).json({
        message: "Case not found or does not belong to this lawyer",
      });
    }

    const query = `
      SELECT h.hearing_id, h.case_number, h.hearing_name, 
             h.created_at, h.updated_at, c.case_title 
      FROM case_hearings h 
      JOIN cases c ON h.case_number = c.case_number 
      WHERE h.case_number = ? 
      ORDER BY h.created_at DESC
    `;

    const [hearings] = await db.query(query, [caseNumber]);

    res.status(200).json({
      message: "Hearings retrieved successfully",
      count: hearings.length,
      hearings: hearings,
    });
  } catch (err) {
    console.error("Error getting hearings:", err);
    res.status(500).json({ message: "Error retrieving hearings" });
  }
};

// Get all hearings for the lawyer (across all cases)
exports.getAllHearings = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware

    const query = `
      SELECT h.hearing_id, h.case_number, h.hearing_name, 
             h.created_at, h.updated_at, c.case_title, cl.name as client_name 
      FROM case_hearings h 
      JOIN cases c ON h.case_number = c.case_number 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.lawyer_id = ? 
      ORDER BY h.created_at DESC
    `;

    const [hearings] = await db.query(query, [lawyerId]);

    res.status(200).json({
      message: "All hearings retrieved successfully",
      count: hearings.length,
      hearings: hearings,
    });
  } catch (err) {
    console.error("Error getting all hearings:", err);
    res.status(500).json({ message: "Error retrieving hearings" });
  }
};

// Get hearings by hearing name (search functionality)
exports.getHearingsByName = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { hearingName } = req.params;

    if (!hearingName) {
      return res.status(400).json({ message: "Hearing name is required" });
    }

    const query = `
      SELECT h.hearing_id, h.case_number, h.hearing_name, 
             h.created_at, h.updated_at, c.case_title, cl.name as client_name 
      FROM case_hearings h 
      JOIN cases c ON h.case_number = c.case_number 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE c.lawyer_id = ? AND h.hearing_name LIKE ?
      ORDER BY h.created_at DESC
    `;

    // Use LIKE for partial name matching
    const searchTerm = `%${hearingName}%`;
    const [hearings] = await db.query(query, [lawyerId, searchTerm]);

    if (hearings.length === 0) {
      return res.status(404).json({
        message: "No hearings found with that name",
      });
    }

    res.status(200).json({
      message: "Hearings found successfully",
      count: hearings.length,
      hearings: hearings,
    });
  } catch (err) {
    console.error("Error searching hearings:", err);
    res.status(500).json({ message: "Error searching hearings" });
  }
};

// Get single hearing by ID
exports.getHearingById = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { hearingId } = req.params;

    const query = `
      SELECT h.hearing_id, h.case_number, h.hearing_name, 
             h.created_at, h.updated_at, c.case_title, cl.name as client_name 
      FROM case_hearings h 
      JOIN cases c ON h.case_number = c.case_number 
      JOIN clients cl ON c.client_id = cl.client_id 
      WHERE h.hearing_id = ? AND c.lawyer_id = ?
    `;

    const [hearing] = await db.query(query, [hearingId, lawyerId]);

    if (hearing.length === 0) {
      return res.status(404).json({ message: "Hearing not found" });
    }

    res.status(200).json({
      message: "Hearing retrieved successfully",
      hearing: hearing[0],
    });
  } catch (err) {
    console.error("Error getting hearing:", err);
    res.status(500).json({ message: "Error retrieving hearing" });
  }
};

// Delete hearing by ID
exports.deleteHearing = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { hearingId } = req.params;

    // Check if hearing exists and belongs to this lawyer using case_number
    const checkQuery = `
      SELECT h.hearing_id, h.hearing_name, h.case_number, c.lawyer_id 
      FROM case_hearings h 
      JOIN cases c ON h.case_number = c.case_number 
      WHERE h.hearing_id = ? AND c.lawyer_id = ?
    `;
    const [existingHearing] = await db.query(checkQuery, [hearingId, lawyerId]);

    if (existingHearing.length === 0) {
      return res.status(404).json({ message: "Hearing not found" });
    }

    const hearing = existingHearing[0];

    // Delete hearing from database (PDF will be deleted automatically)
    const deleteQuery = "DELETE FROM case_hearings WHERE hearing_id = ?";
    const [result] = await db.query(deleteQuery, [hearingId]);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to delete hearing" });
    }

    res.status(200).json({
      message: "Hearing deleted successfully",
      deletedHearing: {
        hearing_id: hearing.hearing_id,
        hearing_name: hearing.hearing_name,
        case_number: hearing.case_number,
      },
    });
  } catch (err) {
    console.error("Error deleting hearing:", err);
    res.status(500).json({ message: "Error deleting hearing" });
  }
};

// View/Download PDF by hearing ID
exports.viewPDF = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { hearingId } = req.params;

    // Get PDF data with ownership check using case_number
    const query = `
      SELECT h.hearing_pdf 
      FROM case_hearings h 
      JOIN cases c ON h.case_number = c.case_number 
      WHERE h.hearing_id = ? AND c.lawyer_id = ?
    `;
    const [result] = await db.query(query, [hearingId, lawyerId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const pdfData = result[0];

    // Set headers for PDF viewing
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="hearing_${hearingId}.pdf"`
    );

    // Send PDF data
    res.send(pdfData.hearing_pdf);
  } catch (err) {
    console.error("Error viewing PDF:", err);
    res.status(500).json({ message: "Error retrieving PDF" });
  }
};

// Send professional email to client about case/hearing updates
exports.sendClientEmail = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { case_number, points } = req.body;

    // Validation
    if (
      !case_number ||
      !points ||
      !Array.isArray(points) ||
      points.length === 0
    ) {
      return res.status(400).json({
        message: "Case number and points array are required",
      });
    }

    // Get case details, lawyer info, and client info
    const caseQuery = `
      SELECT c.case_number, c.case_title, c.description,
             cl.name as client_name, cl.email as client_email,
             l.name as lawyer_name, l.email as lawyer_email, 
             l.mobile_no as lawyer_mobile
      FROM cases c 
      JOIN clients cl ON c.client_id = cl.client_id 
      JOIN lawyers l ON c.lawyer_id = l.lawyer_id 
      WHERE c.case_number = ? AND c.lawyer_id = ?
    `;

    const [caseData] = await db.query(caseQuery, [case_number, lawyerId]);

    if (caseData.length === 0) {
      return res.status(404).json({
        message: "Case not found or does not belong to this lawyer",
      });
    }

    const caseInfo = caseData[0];

    if (!caseInfo.client_email) {
      return res.status(400).json({
        message: "Client email not found for this case",
      });
    }

    // Create professional email template with standard subject
    const emailSubject = `Case update for your case ${caseInfo.case_number}`;

    const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Case Update</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 24px;
            margin-bottom: 8px;
            font-weight: 600;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #2c3e50;
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .case-info {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .case-info h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .case-details {
            display: grid;
            gap: 8px;
        }
        
        .case-detail {
            display: flex;
            align-items: center;
        }
        
        .case-detail strong {
            min-width: 120px;
            color: #495057;
            font-weight: 600;
        }
        
        .case-detail span {
            color: #6c757d;
        }
        
        .message-section {
            background: #fff;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .message-section h4 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-weight: 600;
            font-size: 16px;
        }
        
        .client-message {
            color: #495057;
            line-height: 1.7;
            font-size: 15px;
            white-space: pre-line;
        }
        
        .points-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .points-list li {
            background: #f8f9fa;
            border-left: 3px solid #667eea;
            padding: 15px 20px;
            margin-bottom: 12px;
            border-radius: 0 6px 6px 0;
            color: #495057;
            line-height: 1.6;
            font-size: 15px;
            position: relative;
        }
        
        .points-list li:before {
            content: "📌";
            position: absolute;
            left: -5px;
            top: 15px;
            background: #667eea;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }
        
        .points-list li:nth-child(even) {
            background: #e3f2fd;
            border-left-color: #2196f3;
        }
        
        .points-list li:nth-child(even):before {
            background: #2196f3;
        }
        
        .lawyer-signature {
            margin-top: 30px;
            padding: 25px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 8px;
            border-top: 3px solid #667eea;
        }
        
        .lawyer-signature h4 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .lawyer-details {
            display: grid;
            gap: 8px;
        }
        
        .lawyer-detail {
            display: flex;
            align-items: center;
            font-size: 14px;
        }
        
        .lawyer-detail strong {
            min-width: 100px;
            color: #495057;
            font-weight: 600;
        }
        
        .lawyer-detail span {
            color: #6c757d;
        }
        
        .footer {
            background: #2c3e50;
            color: white;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
        }
        
        .footer p {
            margin-bottom: 5px;
        }
        
        .disclaimer {
            background: #ffc107;
            color: #856404;
            padding: 15px 30px;
            font-size: 12px;
            text-align: center;
            font-weight: 500;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header, .content, .footer {
                padding: 20px;
            }
            
            .case-details, .lawyer-details {
                grid-template-columns: 1fr;
            }
            
            .case-detail, .lawyer-detail {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>📋 Case Update</h1>
            <p>Legal Communication from Your Attorney</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Dear ${caseInfo.client_name},
            </div>
            
            <div class="case-info">
                <h3>📂 Case Information</h3>
                <div class="case-details">
                    <div class="case-detail">
                        <strong>Case Number:</strong>
                        <span>${caseInfo.case_number}</span>
                    </div>
                    <div class="case-detail">
                        <strong>Case Title:</strong>
                        <span>${caseInfo.case_title}</span>
                    </div>
                    <div class="case-detail">
                        <strong>Date:</strong>
                        <span>${new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}</span>
                    </div>
                </div>
            </div>
            
            <div class="message-section">
                <h4>💬 Case Update Summary</h4>
                <ul class="points-list">
                    ${points
                      .map(
                        (point, index) => `
                        <li>${point}</li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
            
            <div class="lawyer-signature">
                <h4>👨‍💼 Lawyer Information</h4>
                <div class="lawyer-details">
                    <div class="lawyer-detail">
                        <strong>Name: </strong>
                        <span>${caseInfo.lawyer_name}</span>
                    </div>
                    <div class="lawyer-detail">
                        <strong>Email: </strong>
                        <span>${caseInfo.lawyer_email}</span>
                    </div>
                    <div class="lawyer-detail">
                        <strong>Mobile: </strong>
                        <span>${caseInfo.lawyer_mobile || "Not provided"}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            ⚠️ This communication is confidential and may be legally privileged. If you are not the intended recipient, please notify the sender and delete this message.
        </div>
        
        <div class="footer">
            <p><strong>Nyayasetu Legal Service</strong></p>
            <p>Professional Legal Communication System</p>
            <p>© ${new Date().getFullYear()} - All rights reserved</p>
        </div>
    </div>
</body>
</html>`;

    // Send email
    await sendEmail(caseInfo.client_email, emailSubject, emailHTML);

    // Log the email communication (optional - you can create an email_logs table)
    console.log(
      `Email sent to client ${caseInfo.client_name} (${caseInfo.client_email}) for case ${case_number}`
    );

    res.status(200).json({
      message: "Email sent successfully to client",
      email_details: {
        recipient: {
          name: caseInfo.client_name,
          email: caseInfo.client_email,
        },
        case: {
          case_number: caseInfo.case_number,
          case_title: caseInfo.case_title,
        },
        sender: {
          lawyer_name: caseInfo.lawyer_name,
          lawyer_email: caseInfo.lawyer_email,
        },
        subject: emailSubject,
        sent_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("Error sending client email:", err);
    res.status(500).json({
      message: "Error sending email to client",
      error: err.message,
    });
  }
};
module.exports = exports;
