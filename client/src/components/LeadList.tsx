"use client";
import { Lead } from "@/types/lead";
import Swal from "sweetalert2";
import Link from "next/link";
import { deleteLead } from "@/util/api";

interface LeadListProps {
  leads: Lead[];
  onLeadDeleted: () => void;
  isLoading: boolean;
}

const LeadList: React.FC<LeadListProps> = ({
  leads,
  onLeadDeleted,
  isLoading,
}) => {
  const handleDelete = async (leadId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteLead(leadId);
          onLeadDeleted(); // Refresh the lead list
          Swal.fire("Deleted!", "The lead has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the lead.", "error");
        }
      }
    });
  };

  const TruncatedEmail = ({
    email,
    maxLength,
  }: {
    email: string;
    maxLength: number;
  }) => {
    const truncatedText =
      email.length > maxLength ? email.substring(0, maxLength) + "..." : email;
    return <span>{truncatedText}</span>;
  };

  return (
    <div className="container mx-auto px-[10] md:px-[80] mb-[50]">
      <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-gray-600">
        Manage Leads
      </h2>

      {isLoading ? (
        // Loading spinner
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        // Leads table
        <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-md">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-200">
              <tr className="text-left sm:text-center">
                <th className="px-2 py-3 text-gray-600 whitespace-nowrap">
                  Name
                </th>
                <th className="px-2 py-3 text-gray-600 whitespace-nowrap">
                  Email
                </th>
                <th className="px-2 py-3 text-gray-600 whitespace-nowrap">
                  Status
                </th>
                <th className="px-2 py-3 text-gray-600 whitespace-nowrap">
                  Created At
                </th>
                <th className="px-2 py-3 text-gray-600 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b text-left sm:text-center"
                >
                  <td className="px-2 py-4 text-gray-800">{lead.name}</td>
                  <td className="px-2 py-4 text-gray-800">
                    <TruncatedEmail email={lead.email} maxLength={20} />
                  </td>
                  <td className="px-2 py-4 text-gray-800">{lead.status}</td>
                  <td className="px-2 py-4 text-gray-800">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-4">
                    <Link
                      href={`/${lead._id}`}
                      className="text-blue-500 hover:underline mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadList;
