const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");

// Lead routes
router.post("/", leadController.createLead);
router.get("/", leadController.getLeads);
router.get("/:id", leadController.getLeadById);
router.put("/:id", leadController.updateLead);
router.delete("/:id", leadController.deleteLead);

module.exports = router;
