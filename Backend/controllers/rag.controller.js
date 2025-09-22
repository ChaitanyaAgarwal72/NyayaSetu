const db = require("../utils/db");

exports.communicateWithRag = async (req, res) => {
  try {
    const lawyerId = req.user.id; // From JWT token middleware
    const { question, case_number } = req.body;

    // Validation
    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    if (!case_number) {
      return res.status(400).json({
        message: "Case number is required",
      });
    }

    // Verify that the case belongs to this lawyer
    const caseCheckQuery = `
      SELECT * FROM cases 
      WHERE case_number = ? AND lawyer_id = ?
    `;
    const [caseExists] = await db.query(caseCheckQuery, [
      case_number,
      lawyerId,
    ]);

    if (caseExists.length === 0) {
      return res.status(404).json({
        message: "Case not found or does not belong to this lawyer",
      });
    }
    console.log(case_number);
    console.log(question);
    console.log("Making API call to RAG service");

    // Make external API call to localhost:5000
    const externalResponse = await fetch(
      "http://localhost:5000/nyayasetu/rag/chat", // TODO Replace with actual endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            req.headers.authorization?.split(" ")[1] || ""
          }`,
          "X-Case-Number": case_number.toString(),
          "X-Lawyer-ID": lawyerId.toString(),
          "X-Source": "law-firm-backend",
        },
        body: JSON.stringify({
          question: question,
          case_number: case_number,
          lawyer_id: lawyerId,
          metadata: {
            timestamp: new Date().toISOString(),
            source: "law_firm_backend",
            request_id: `rag_${Date.now()}_${lawyerId}`,
          },
        }),
        timeout: 30000, // 30 seconds timeout
      }
    );

    if (!externalResponse.ok) {
      console.error(
        "RAG API Error:",
        externalResponse.status,
        externalResponse.statusText
      );
      return res.status(502).json({
        message: "Failed to get response from RAG service",
        error: `RAG API returned ${externalResponse.status}`,
        details: externalResponse.statusText,
      });
    }

    // Get the JSON response from the external API
    const ragResponse = await externalResponse.json();

    console.log("RAG API call successful");

    // Return the response from the external API
    return res.status(200).json({
      message: "RAG query processed successfully",
      case_number: case_number,
      question: question,
      response: ragResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Error communicating with RAG service:", err);

    // Handle different types of errors
    if (err.name === "FetchError") {
      return res.status(503).json({
        message: "Failed to connect to RAG service",
        error: err.message,
      });
    }

    res.status(500).json({
      message: "Error processing RAG request",
      error: err.message,
    });
  }
};
