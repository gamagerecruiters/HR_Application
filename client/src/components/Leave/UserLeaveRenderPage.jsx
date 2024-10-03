import LeaveHeader from "./LeaveHeader";
import { Context } from "../../main";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext, useCallback } from "react";
import LeaveTable from "./LeaveTable";
import LeaveDeletePrompt from "./LeaveDeletePrompt";
import AccessControl from "./AccessControl";

const UserLeaveRenderPage = () => {
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
    <>
      {/* User Leave Page Header */}
      <LeaveHeader fullName={`${user.firstName} ${user.lastName}`} />

      {/* Apply Leave Button */}
      <AccessControl userType={user.userType}/>

      {/* User Leave Table */}
      <LeaveTable user={user} leaves={leaves} handleDeleteConfirmation={handleDeleteConfirmation} approveStyle={approveStyle}/>

      {/*  */}
      <LeaveDeletePrompt showDeletePrompt={showDeletePrompt} handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteConfirm}/>
    </>
  );
};

export default UserLeaveRenderPage;
