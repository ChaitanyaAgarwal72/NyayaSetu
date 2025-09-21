// utils/mailService.js

const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
  },
});

/**
 * Function to send an email using nodemailer
 * @param {string} to The recipient's email address
 * @param {string} subject The email subject
 * @param {string} html The email content in HTML
 */
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    html: html,
  };

  try {
    console.log(`Attempting to send email to ${to}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
