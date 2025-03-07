"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getLead, updateLead } from "@/util/api";
import { Lead } from "@/types/lead";
import React from "react";

const EditLead = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  console.log("ID", id);

  const [lead, setLead] = useState<Lead>({
    _id: "",
    name: "",
    email: "",
    status: "New",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        if (id) {
          const response = await getLead(id);
          console.log("Response", response);
          setLead(response as unknown as Lead);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching lead:", error);
        Swal.fire("Error", "There was an issue fetching the lead.", "error");
      }
    };

    fetchLead();
  }, [id]);

  console.log("Lead", lead);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateLead(lead._id, {
        name: lead.name,
        email: lead.email,
        status: lead.status,
      });
      Swal.fire("Success", "Lead updated successfully!", "success");
      router.push("/"); // Redirect to the leads list
    } catch (error) {
      console.error("Error updating lead:", error);
      Swal.fire("Error", "There was an issue updating the lead.", "error");
    }
  };

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    );
  }

  return (
    <div className=" w-full flex flex-col items-center justify-center  mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Lead</h2>
      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={lead.name}
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
            value={lead.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={lead.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-white"
            required
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
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Lead
        </button>
      </form>
    </div>
  );
};

export default EditLead;
