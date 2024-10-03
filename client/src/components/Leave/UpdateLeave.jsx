import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../main";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";

const UpdateLeave = () => {
  const { user } = useContext(Context);
  const [User, setUser] = useState(user);
  const { leaveId } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [leaveUser, setLeaveUser] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState("");
  const [type, setType] = useState("Sick Leave");
  const [loading, setLoading] = useState(false);
  const [supervisorApproval, setSupervisorApproval] = useState("Pending");
  const [adminApproval, setAdminApproval] = useState("Pending");

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api-v1/leave/get-leave-by-leaveId/${leaveId}`,
          { withCredentials: true }
        );
        const leave = response.data.leave[0];
        console.log("leave", leave);
        setLeaveUser(leave.userId);
        setStartDate(new Date(leave.startDate));
        setEndDate(new Date(leave.endDate));
        setReason(leave.reason);
        setType(leave.type);
        if (user.userType === "Admin") {
          setSupervisorApproval(leave.supervisorApproval);
        }

        if (user.userType === "SuperAdmin") {
          setSupervisorApproval(leave.supervisorApproval);
        }

        setAdminApproval(leave.adminApproval);
      } catch (error) {
        toast.error("Failed to fetch leave details");
      }
    };

    fetchLeaveDetails();
  }, [leaveId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const leaveData = {
        startDate,
        endDate,
        reason,
        type,
      };

      console.log(leaveData);

      await axios.patch(
        `http://localhost:8800/api-v1/leave/update-leave/${leaveId}`,
        leaveData,
        { withCredentials: true }
      );

      if (user && user.userType === "Admin") {
        await axios.put(
          `http://localhost:8800/api-v1/leave/update-leave-adminApproval/${leaveId}`,
          { supervisorApproval: supervisorApproval },
          { withCredentials: true }
        );

        // toast.success("Leave application updated successfully");
      }

      if (user && user.userType === "SuperAdmin") {
        await axios.put(
          `http://localhost:8800/api-v1/leave/update-leave-superAdminApproval/${leaveId}`,
          { adminApproval: adminApproval },
          { withCredentials: true }
        );

        // toast.success("Leave application updated successfully");
      }
      toast.success("Leave application updated successfully");
      
      navigate("/leave");
    } catch (error) {
      toast.error("Failed to update leave application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Update Leave Application</h1>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
            </select>
          </div>
          {user && user.userType === "Admin" ? (
            <>
              {/*  ["Pending", "Approved", "Rejected"], */}

              <div className="mb-4">
                <label
                  htmlFor="supervisorApproval"
                  className="block text-sm font-medium text-gray-700"
                >
                  Supervisor Approval
                </label>
                {user._id === leaveUser ? (
                  <>
                    <input
                      type="text"
                      id="supervisorApproval"
                      value={supervisorApproval}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
                    />
                  </>
                ) : (
                  <>
                    <select
                      id="supervisorApproval"
                      value={supervisorApproval}
                      onChange={(e) => setSupervisorApproval(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </>
                )}
              </div>
            </>
          ) : (
            <></>
          )}

          {user && user.userType === "SuperAdmin" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="adminApproval"
                  className="block text-sm font-medium text-gray-700"
                >
                  Admin Approval
                </label>
                {user._id === leaveUser ? (
                  <>
                    <input
                      type="text"
                      id="adminApproval"
                      value={adminApproval}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
                    />
                  </>
                ) : (
                  <>
                    <select
                      id="adminApproval"
                      value={adminApproval}
                      onChange={(e) => setAdminApproval(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Leave Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLeave;
