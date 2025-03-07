"use client";
import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null); // Clear previous messages

    try {
      await addLead(formData);
      onLeadAdded(); // Refresh the lead list
      setFormData({ name: "", email: "", status: "New" }); // Reset form
      setSuccessMessage("Lead added successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    } catch (error) {
      console.error("Error adding lead:", error);
    } finally {
      setIsLoading(false);
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
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={isLoading}
        >
          Add Lead
        </button>
      )}
      {successMessage && (
        <p className="text-green-600 text-center mt-4">{successMessage}</p>
      )}
    </form>
  );
};

export default LeadForm;
