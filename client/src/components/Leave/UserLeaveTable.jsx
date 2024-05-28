import { useEffect, useState, useContext, useCallback } from "react";
import { Context } from "../../main";
import axios from "axios";
import { Link } from "react-router-dom";

const UserLeaveTable = () => {
  const { user } = useContext(Context);
  const userId = user?._id; // Extract user ID from the context
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLeaveId, setDeleteLeaveId] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  const fetchLeaves = async () => {
    try {
      console.log("user", user);
      console.log("_id", userId);
      const response = await axios.get(
        `http://localhost:8800/api-v1/leave/get-leave/${userId}`,
        { withCredentials: true }
      );
      console.log(response);
      setLeaves(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLeaves();
    }
  }, [userId]);

  const deleteLeave = useCallback(async () => {
    try {
      await axios.delete(
        `http://localhost:8800/api-v1/leave/delete-leave/${deleteLeaveId}`,
        {
          withCredentials: true,
        }
      );
      // Once leave is deleted, refetch the updated leave list
      //setLeaves(leaves.filter((leave) => leave._id !== deleteLeaveId));
      fetchLeaves();
      setDeleteLeaveId(null); // Reset deleteLeaveId after deletion
    } catch (error) {
      console.log("Error deleting leave:", error);
    }
  }, [deleteLeaveId, leaves]);

  const handleDeleteConfirmation = (leaveId) => {
    setDeleteLeaveId(leaveId);
    setShowDeletePrompt(true);
  };

  const handleDeleteCancel = () => {
    setShowDeletePrompt(false);
  };

  const handleDeleteConfirm = () => {
    setShowDeletePrompt(false);
    deleteLeave();
  };

  const approveStyle = (approve) => {
    if (approve === "Pending") {
      return "text-orange-500";
    } else if (approve === "Approved") {
      return "text-green-500";
    } else {
      return "text-red-500";
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leave Details</h1>
        <Link to={"/apply-leave"}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
            Apply Leave
          </button>
        </Link>
        {user && user.userType === "Admin" && (
          <>
            <Link to={"/leave-request-check-supervisor"}>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                Requested Leave By Users
              </button>
            </Link>
          </>
        )}
        {user && user.userType === "SuperAdmin" && (
          <>
            <Link to={"/leave-request-check-admin"}>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                Check Leave
              </button>
            </Link>

            <Link to={"/leave-statistics"}>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                Leave Statistics
              </button>
            </Link>
          </>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Reason</th>
              <th className="py-2 px-4 border-b">Type</th>
              {user && user.userType === "User" && (
                <>
                  <th className="py-2 px-4 border-b">Supervisor Approval</th>
                </>
              )}
              <th className="py-2 px-4 border-b">Confirmation</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="py-2 px-4 border-b">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{leave.reason}</td>
                <td className="py-2 px-4 border-b">{leave.type}</td>
                {/*  ["Pending", "Approved", "Rejected"], */}
                {user && user.userType === "User" && (
                  <>
                    <td
                      className={`py-2 px-4 border-b ${approveStyle(
                        leave.supervisorApproval
                      )}`}
                    >
                      {leave.supervisorApproval}
                    </td>
                  </>
                )}

                <td
                  className={`py-2 px-4 border-b ${approveStyle(
                    leave.adminApproval
                  )}`}
                >
                  {leave.adminApproval}
                </td>

                <td className="py-2 px-4 border-b">
                  <div className="flex items-center gap-2">
                  <Link to={`/view-leave/${leave._id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4 rounded">
                        View Leave
                      </button>
                    </Link>
                    <Link to={`/update-leave/${leave._id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4 rounded">
                        Update
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
                      onClick={() => handleDeleteConfirmation(leave._id)}
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
      {/* Delete Prompt */}
      {showDeletePrompt && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-4 z-20">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this leave?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                onClick={handleDeleteConfirm}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleDeleteCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLeaveTable;
