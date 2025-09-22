const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Routs
const adminRoutes = require("./routes/admin.routes");
const lawyerRoutes = require("./routes/lawyer.routes");
const clientRoutes = require("./routes/clients.routes");
const casesRoutes = require("./routes/cases.routes");
const hearingsRoutes = require("./routes/hearings.routes");
const ragRoutes = require("./routes/rag.routes");
//admin Routes
app.use("/nyayasetu/api/admins", adminRoutes);
//Lawyer Routes
app.use("/nyayasetu/api/lawyers", lawyerRoutes);
//client Routes
app.use("/nyayasetu/api/clients", clientRoutes);
//cases Routes
app.use("/nyayasetu/api/cases", casesRoutes);
//hearings Routes
app.use("/nyayasetu/api/hearings", hearingsRoutes);
//rag
app.use("/nyayasetu/api/rag", ragRoutes);
// app.use(cors({
//   origin: 'http://localhost:3000',  // frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});
