const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();
const { leadSchema } = require("../utils/validation");
// Add a new lead
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const validatedData = leadSchema.parse(req.body);
    const { name, email, status } = validatedData;

    // Check if the email already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create and save the new lead
    const newLead = new Lead({ name, email, status });
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch all leads
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "asc",
      status,
    } = req.query;

    // Build the query for filtering
    const query = {};
    if (status) {
      query.status = status;
    }

    // Build the sort object
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Fetch paginated and sorted leads
    const leads = await Lead.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get the total count of leads (for pagination)
    const total = await Lead.countDocuments(query);

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      leads,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
