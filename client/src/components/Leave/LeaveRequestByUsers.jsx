import { useEffect, useState, useContext } from "react";
import { Context } from "../../main";
import axios from "axios";
import { Link } from "react-router-dom";

const LeaveRequestByUsers = () => {
  const { user } = useContext(Context);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaves = async () => {
    try {
      const pendingResponse = await axios.get(
        `http://localhost:8800/api-v1/leave/all-leave-need-supervisor-approval`,
        { withCredentials: true }
      );
      const approvedResponse = await axios.get(
        `http://localhost:8800/api-v1/leave/all-leave-supervisor-approved`,
        { withCredentials: true }
      );
      const rejectedResponse = await axios.get(
        `http://localhost:8800/api-v1/leave/all-leave-supervisor-rejected`,
        { withCredentials: true }
      );
      setPendingLeaves(pendingResponse.data.data);
      setApprovedLeaves(approvedResponse.data.data);
      setRejectedLeaves(rejectedResponse.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLeaves();
    }
  }, [user]);

  const approveStyle = (approve) => {
    if (approve === "Pending") {
      return "text-orange-500";
    } else if (approve === "Approved") {
      return "text-green-500";
    } else {
      return "text-red-500";
    }
  };

  const showSupervisorAppliedLeaveStyle = (leave) => {

    if(leave.userId === user){
      return "bg-green-400 text-white";
    }
    else{
      return "";
    }
  }

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  const renderTable = (leaves, title) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Reason</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Supervisor Approval</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className={`${showSupervisorAppliedLeaveStyle(leave)}`}>
                <td className="py-2 px-4 border-b">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{leave.reason}</td>
                <td className="py-2 px-4 border-b">{leave.type}</td>
                <td
                  className={`py-2 px-4 border-b ${approveStyle(
                    leave.supervisorApproval
                  )}`}
                >
                  {leave.supervisorApproval}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center gap-2">
                    <Link to={`/update-leave/${leave._id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4 rounded">
                        Update
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
                      // Add delete functionality if needed
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Leave Requests</h1>
      {renderTable(pendingLeaves, "Pending Supervisor Approval")}
      {renderTable(approvedLeaves, "Approved by Supervisor")}
      {renderTable(rejectedLeaves, "Rejected by Supervisor")}
    </div>
  );
};

export default LeaveRequestByUsers;
