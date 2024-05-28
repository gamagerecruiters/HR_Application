import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ShowLeave = () => {
  const { leaveId } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLeave, setUserLeave] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api-v1/leave/get-leave-by-leaveId/${leaveId}`,
          { withCredentials: true }
        );
        console.log(response.data.leave[0]);
        setLeave(response.data.leave[0]);
        const response1 = await axios.get(
          `http://localhost:8800/api-v1/user/get-user/${response.data.leave[0].userId}`,
          { withCredentials: true }
        );
        console.log(response1);
        setUserLeave(response1.data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveDetails();
  }, [leaveId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Leave Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-medium">Leave Type</h3>
          <p className="text-lg">{leave.type}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Start Date</h3>
          <p className="text-lg">{leave.startDate}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">End Date</h3>
          <p className="text-lg">{leave.endDate}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Status</h3>
          <p className="text-lg">{leave.adminApproval}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Reason</h3>
          <p className="text-lg">{leave.reason}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">User</h3>
          <p className="text-lg">{leave.userId}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium">Full Name</h3>
          <p className="text-lg">
            {userLeave.firstName} - {userLeave.lastName}
          </p>
        </div>
        <div>
          <Link to={`/user/${leave.userId}`}>
            <button className=" bg-amber-500 text-black p-2 rounded-md">View User Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowLeave;
