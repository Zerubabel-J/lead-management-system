"use client";
import { useState, useEffect } from "react";
import LeadForm from "@/components/LeadForm";
import LeadList from "@/components/LeadList";
import { getLeads } from "@/util/api";
import { Lead } from "@/types/lead";

const Page = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // Function to fetch leads
  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data.leads || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  return (
    <>
      <LeadForm onLeadAdded={fetchLeads} />
      <LeadList leads={leads} onLeadDeleted={fetchLeads} />
    </>
  );
};

export default Page;
