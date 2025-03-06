const express = require("express");
const cors = require("cors");
const { dbConfig } = require("./dbConfig/dbConfig");
const leadRoutes = require("./routes/leadRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConfig();

// Routes
app.get("/", (req, res) => {
  res.send("Lead Manager API is running!");
});

app.use("/api/leads", leadRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
