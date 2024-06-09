import  { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { Link } from "react-router-dom";
import LeaveTableSuperAdmin from "./LeaveTableSuperAdmin";
import AccessControl from "./AccessControl";
import LeaveHeader from "./LeaveHeader";

const SuperAdminLeaveRenderPage = () => {
const { user } = useContext(Context);
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

<LeaveHeader fullName={`${user.firstName} ${user.lastName}`} />

<AccessControl userType={user.userType} />


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
          <LeaveTableSuperAdmin leaveRequests={approvalNeed} />
        )}
        {activeTab === "approved" && <LeaveTableSuperAdmin leaveRequests={approved} />}
        {activeTab === "rejected" && <LeaveTableSuperAdmin leaveRequests={rejected} />}
      </div>
    </div>
  );
};



export default SuperAdminLeaveRenderPage;
