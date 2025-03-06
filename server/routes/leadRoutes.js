const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();

// Add a new lead
router.post("/", async (req, res) => {
  try {
    const { name, email, status } = req.body;
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
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
