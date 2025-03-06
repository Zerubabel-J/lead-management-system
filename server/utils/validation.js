const { z } = require("zod");

// Validation schema for adding a new lead
const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  status: z.enum([
    "New",
    "Engaged",
    "Proposal Sent",
    "Closed-Won",
    "Closed-Lost",
  ]),
});

module.exports = { leadSchema };
