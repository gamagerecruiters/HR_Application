import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LeaveRequestBySupervisor = () => {
  const [approvalNeed, setApprovalNeed] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [activeTab, setActiveTab] = useState("approvalNeed");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const [approvalNeedResponse, approvedResponse, rejectedResponse] =
          await Promise.all([
            axios.get(
              "http://localhost:8800/api-v1/leave/all-leave-need-SuperAdmin-approval",
              { withCredentials: true }
            ),
            axios.get(
              "http://localhost:8800/api-v1/leave/all-leave-admin-approved",
              { withCredentials: true }
            ),
            axios.get(
              "http://localhost:8800/api-v1/leave/all-leave-admin-rejected",
              { withCredentials: true }
            ),
          ]);

        setApprovalNeed(approvalNeedResponse.data.data);
        setApproved(approvedResponse.data.data);
        setRejected(rejectedResponse.data.data);
      } catch (error) {
        console.log("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Leave Requests by Supervisor</h1>
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "approvalNeed"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("approvalNeed")}
        >
          Approval Needed
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "approved" ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("approved")}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "rejected" ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected
        </button>
      </div>

      <div className="bg-white p-4 rounded-b-lg shadow-lg">
        {activeTab === "approvalNeed" && (
          <LeaveTable leaveRequests={approvalNeed} />
        )}
        {activeTab === "approved" && <LeaveTable leaveRequests={approved} />}
        {activeTab === "rejected" && <LeaveTable leaveRequests={rejected} />}
      </div>
    </div>
  );
};

const LeaveTable = ({ leaveRequests }) => {
  const approveStyle = (approve) => {
    if (approve === "Pending") {
      return "text-orange-500";
    } else if (approve === "Approved") {
      return "text-green-500";
    } else {
      return "text-red-500";
    }
  };
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className="text-center">
          <th className="py-2">Type</th>
          <th className="py-2">Reason</th>
          <th className="py-2">Start Date</th>
          <th className="py-2">End Date</th>
          <th className="py-2">Status</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.map((leave) => (
          <tr key={leave._id} className="text-center border-t">
            <td className="py-2">{leave.type}</td>
            <td className="py-2">{leave.reason}</td>
            <td className="py-2">
              {new Date(leave.startDate).toLocaleDateString()}
            </td>
            <td className="py-2">
              {new Date(leave.endDate).toLocaleDateString()}
            </td>
            <td className={`py-2 ${approveStyle(leave.adminApproval)}`}>
              {leave.adminApproval}
            </td>
            <td className="py-2">
              <Link to={`/update-leave/${leave._id}`}>
                <button className="mr-2 px-4 py-1 bg-yellow-500 text-white rounded">
                  Update
                </button>
              </Link>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveRequestBySupervisor;
