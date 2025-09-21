const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");
const { sendEmail } = require("../utils/mailService");
//sign up:
exports.create = async (req, res) => {
  try {
    const saltrounds = 10;
    const password = req.body.password;
    const hashedPass = await bcrypt.hash(password, saltrounds);

    const insData = {
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      advocate_no: req.body.advocate_no,
      password: hashedPass,
      mobile_no: req.body.mobile_no,
      dob: req.body.dob,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
    };

    const qry =
      "INSERT INTO lawyers (name, gender, email, advocate_no, password, mobile_no, dob, address, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      insData.name,
      insData.gender,
      insData.email,
      insData.advocate_no,
      insData.password,
      insData.mobile_no,
      insData.dob,
      insData.address,
      insData.city,
      insData.state,
    ];

    const [result] = await db.query(qry, values);

    if (result.affectedRows == 0) {
      res.status(500).json({ message: "Unable to Create a User" });
    } else {
      res.status(201).json({
        message: "Lawyer successfully created",
        lawyerId: result.insertId,
        insertedData: {
          ...insData,
          password: "[HIDDEN]", // Don't send password back
        },
      });
    }
  } catch (err) {
    console.error("Error creating lawyer:", err);

    // Handle specific database errors
    if (err.code === "ER_DUP_ENTRY") {
      if (err.message.includes("email")) {
        res.status(400).json({ message: "Email already exists" });
      } else if (err.message.includes("advocate_no")) {
        res.status(400).json({ message: "Advocate number already exists" });
      } else {
        res.status(400).json({ message: "Duplicate entry found" });
      }
    } else {
      res.status(500).json({ message: "Unable to create lawyer" });
    }
  }
};
//Login:
exports.login = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Email and Password is required" });
    }
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const email = req.body.email;
    const inputPass = req.body.password;

    console.log("Login attempt:", { email, password: "***" });

    const qry = "SELECT * FROM lawyers WHERE email = ?";
    const [result] = await db.query(qry, [email]);

    console.log(
      "Database result:",
      result.length > 0 ? "User found" : "User not found"
    );

    if (result.length == 0) {
      return res.status(401).json({ message: "Email not found, try again!" });
    }

    console.log("Comparing passwords...");
    const match = await bcrypt.compare(inputPass, result[0].password);
    console.log("Password match:", match);

    if (!match) {
      return res
        .status(401)
        .json({ message: "Email and Password do not match, try again!" });
    }

    const token = jwt.sign(
      {
        id: result[0].lawyer_id,
        email: result[0].email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d", // 3 Days
      }
    );

    res.status(200).json({
      message: "Logged in successfully",
      accessToken: token,
      lawyer: {
        id: result[0].lawyer_id,
        name: result[0].name,
        email: result[0].email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in lawyer" });
  }
};
// fn to generate otp:
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
// get otp for forgot passsword
exports.forgotPasswordOTP = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Email and Password is required" });
    }
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const email = req.body.email;

    const qry = "SELECT * FROM lawyers WHERE email = ?";
    const [result] = await db.query(qry, [email]);

    console.log(
      "Database result:",
      result.length > 0 ? "User found" : "User not found"
    );

    if (result.length == 0) {
      return res.status(401).json({ message: "Email not found, try again!" });
    }
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const [insertionAtOtpTable] = await db.query(
      "INSERT INTO otp_verifications(email, otp, expires_at) value(?, ?, ?)",
      [email, otp, expiresAt]
    );
    if (insertionAtOtpTable.affectedRows > 0)
      console.log(`otp:${otp} generated`);
    const subject = "Password Reset OTP - Nyayasetu Legal Service";
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
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
        
        .message {
            color: #495057;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .otp-container {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #667eea;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
            position: relative;
        }
        
        .otp-container::before {
            content: "🔐";
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 5px 10px;
            border-radius: 50%;
            font-size: 20px;
        }
        
        .otp-label {
            color: #6c757d;
            font-size: 14px;
            margin-bottom: 10px;
            font-weight: 500;
        }
        
        .otp-code {
            color: #667eea;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 4px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
        
        .security-info {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .security-info h4 {
            color: #856404;
            margin-bottom: 15px;
            font-weight: 600;
            font-size: 16px;
        }
        
        .security-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .security-list li {
            color: #856404;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
            font-size: 14px;
        }
        
        .security-list li:before {
            content: "⚠️";
            position: absolute;
            left: 0;
            top: 0;
        }
        
        .note {
            background: #d1ecf1;
            border-left: 4px solid #17a2b8;
            padding: 15px;
            margin: 25px 0;
            border-radius: 0 6px 6px 0;
            color: #0c5460;
            font-size: 14px;
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
            background: #f8d7da;
            color: #721c24;
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
            
            .otp-code {
                font-size: 28px;
                letter-spacing: 2px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔒 Password Reset</h1>
            <p>Secure Authentication Code</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Dear Legal Professional,
            </div>
            
            <div class="message">
                We received a request to reset your password for your Nyayasetu Legal Service account. To proceed with the password reset, please use the verification code below:
            </div>
            
            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
                <div style="color: #6c757d; font-size: 12px; margin-top: 10px;">
                    Valid for 10 minutes only
                </div>
            </div>
            
            <div class="security-info">
                <h4>🛡️ Security Guidelines</h4>
                <ul class="security-list">
                    <li>This OTP expires in 10 minutes from now</li>
                    <li>Use this code only on the official Nyayasetu website</li>
                    <li>Never share this code with anyone</li>
                    <li>Our team will never ask for this code via phone or email</li>
                </ul>
            </div>
            
            <div class="note">
                <strong>Note:</strong> If you did not request this password reset, please ignore this email. Your account remains secure and no changes will be made.
            </div>
        </div>
        
        <div class="disclaimer">
            🔐 This is a security-sensitive email. Please verify the sender before taking any action.
        </div>
        
        <div class="footer">
            <p><strong>Nyayasetu Legal Service</strong></p>
            <p>Secure Legal Communication System</p>
            <p>© ${new Date().getFullYear()} - All rights reserved</p>
        </div>
    </div>
</body>
</html>`;

    // Send email
    await sendEmail(email, subject, htmlContent);

    console.log(`OTP ${otp} sent to ${email}`);

    res.status(200).json({
      message: "OTP sent successfully to your email",
      email: email,
    });
  } catch (err) {
    res.status(500).json({ message: "Error sending mail to change password" });
  }
};
// Verify OTP and Reset Password in single request
exports.verifyOTPAndResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP, and new password are required",
      });
    }

    // Step 1: Verify OTP
    const otpQuery = `
      SELECT * FROM otp_verifications 
      WHERE email = ? AND otp = ? AND is_used = FALSE AND expires_at > NOW()
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    const [otpResult] = await db.query(otpQuery, [email, otp]);

    if (otpResult.length === 0) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // Step 2: Check if user exists
    const userQuery = "SELECT * FROM lawyers WHERE email = ?";
    const [userResult] = await db.query(userQuery, [email]);

    if (userResult.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Step 3: Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Step 4: Update password
    const updatePasswordQuery =
      "UPDATE lawyers SET password = ? WHERE email = ?";
    const [updateResult] = await db.query(updatePasswordQuery, [
      hashedPassword,
      email,
    ]);

    if (updateResult.affectedRows === 0) {
      return res.status(500).json({
        message: "Failed to update password",
      });
    }

    // Step 5: Mark OTP as used
    const markOtpUsedQuery =
      "UPDATE otp_verifications SET is_used = TRUE WHERE id = ?";
    await db.query(markOtpUsedQuery, [otpResult[0].id]);

    // Step 6: Optional - Delete all other OTPs for this email
    const deleteOtherOtpsQuery =
      "DELETE FROM otp_verifications WHERE email = ? AND id != ?";
    await db.query(deleteOtherOtpsQuery, [email, otpResult[0].id]);

    console.log(`Password successfully reset for ${email}`);

    res.status(200).json({
      message: "Password reset successfully",
      email: email,
    });
  } catch (err) {
    console.error("Error in verifyOTPAndResetPassword:", err);
    res.status(500).json({
      message: "Error resetting password",
    });
  }
};
