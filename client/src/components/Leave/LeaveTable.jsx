import { Link } from "react-router-dom"

const LeaveTable = ({ user, leaves, handleDeleteConfirmation, approveStyle }) => {
  return (
    <>
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
              {leave.supervisorApproval !== "Rejected" && (<><td
                className={`py-2 px-4 border-b ${approveStyle(
                  leave.adminApproval
                )}`}
              >
                {leave.adminApproval}
              </td></>)}


              <td className="py-2 px-4 border-b">
                <div className="flex items-center gap-2">
                  <Link to={`/view-leave/${leave._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4 rounded">
                      View Leave
                    </button>
                  </Link>
                  {(leave.supervisorApproval !== "Rejected" && leave.supervisorApproval !== "Approved") && (<><Link to={`/update-leave/${leave._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4 rounded">
                      Update
                    </button>
                  </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
                      onClick={() => handleDeleteConfirmation(leave._id)}
                    >
                      Delete
                    </button></>)}

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default LeaveTable