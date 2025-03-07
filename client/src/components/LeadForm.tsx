"use client";
import { useState } from "react";
import { addLead } from "@/util/api";
import { Lead } from "@/types/lead";

interface LeadFormProps {
  onLeadAdded: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onLeadAdded }) => {
  const [formData, setFormData] = useState<Omit<Lead, "_id" | "createdAt">>({
    name: "",
    email: "",
    status: "New",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLead(formData);
      onLeadAdded(); // Refresh the lead list
      setFormData({ name: "", email: "", status: "New" }); // Reset form
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 mt-[25] px-[10] w-full max-w-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg bg-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg bg-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg bg-white"
        >
          <option value="New">New</option>
          <option value="Engaged">Engaged</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed-Won">Closed-Won</option>
          <option value="Closed-Lost">Closed-Lost</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Lead
      </button>
    </form>
  );
};

export default LeadForm;
