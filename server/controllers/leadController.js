const Lead = require("../models/Lead");
const { leadSchema } = require("../utils/validation");

const leadController = {
  // Create a new lead
  createLead: async (req, res) => {
    try {
      const validatedData = leadSchema.parse(req.body);
      const { name, email, status } = validatedData;

      const existingLead = await Lead.findOne({ email });
      if (existingLead) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newLead = new Lead({ name, email, status });
      await newLead.save();
      res.status(201).json(newLead);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all leads with pagination and filtering
  getLeads: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "asc",
        status,
      } = req.query;

      const query = {};
      if (status) query.status = status;

      const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

      const [leads, total] = await Promise.all([
        Lead.find(query)
          .sort(sort)
          .limit(limit * 1)
          .skip((page - 1) * limit),
        Lead.countDocuments(query),
      ]);

      res.status(200).json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        leads,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single lead by ID
  getLeadById: async (req, res) => {
    try {
      const lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.status(200).json(lead);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update lead by ID
  updateLead: async (req, res) => {
    try {
      const { name, email, status } = req.body;
      const updatedLead = await Lead.findByIdAndUpdate(
        req.params.id,
        { name, email, status },
        { new: true, runValidators: true }
      );

      if (!updatedLead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res
        .status(200)
        .json({ message: "Lead updated successfully", lead: updatedLead });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete lead by ID
  deleteLead: async (req, res) => {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.status(200).json({ message: "Lead deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = leadController;
