import { Link } from "react-router-dom";

const LeaveTableSuperAdmin = ({ leaveRequests }) => {
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

  export default LeaveTableSuperAdmin