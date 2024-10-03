import { Link } from "react-router-dom";

const RenderTable = ({leaves, title ,showSupervisorAppliedLeaveStyle ,approveStyle}) => {
  return (
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
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default RenderTable