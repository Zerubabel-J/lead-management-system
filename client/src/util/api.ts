import axios from "axios";
import { Lead, ApiResponse } from "../types/lead";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://lead-management-system-gfdt.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a new lead
export const addLead = async (
  leadData: Omit<Lead, "_id" | "createdAt">
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/leads", leadData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Fetch all leads
export const getLeads = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get("/leads");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
// Fetch a single lead
export const getLead = async (leadId: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/leads/${leadId}`);
    console.log("Singleee", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
// Update a lead
export const updateLead = async (
  leadId: string,
  leadData: Partial<Lead>
): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/leads/${leadId}`, leadData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Delete a lead
export const deleteLead = async (leadId: string): Promise<ApiResponse> => {
  try {
    const response = await api.delete(`/leads/${leadId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
