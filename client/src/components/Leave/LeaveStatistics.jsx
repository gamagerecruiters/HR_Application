import  { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api-v1/leave/leave-statistics', {withCredentials : true}); 
        setStatistics(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Leave Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium">Total Leaves</h3>
          <p className="text-2xl">{statistics.totalLeaves}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium">Pending Leaves</h3>
          <p className="text-2xl">{statistics.pendingLeaves}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium">Approved Leaves</h3>
          <p className="text-2xl">{statistics.approvedLeaves}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium">Rejected Leaves</h3>
          <p className="text-2xl">{statistics.rejectedLeaves}</p>
        </div>
      </div>

      <h3 className="text-xl font-medium mt-6">Leave Types</h3>
      <div className="mt-4 space-y-2">
        {statistics.leaveTypeCounts.map((type) => (
          <div key={type._id} className="flex justify-between p-2 bg-gray-100 rounded-lg">
            <span>{type._id}</span>
            <span>{type.count}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-medium mt-6">Leaves per User</h3>
      <div className="mt-4 space-y-2">
        {statistics.leavePerUserCounts.map((user) => (
          <div key={user._id} className="flex justify-between p-2 bg-gray-100 rounded-lg">
            <span>{user._id}</span>
            <span>{user.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveStatistics;
