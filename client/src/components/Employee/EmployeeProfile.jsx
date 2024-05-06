import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const EmployeeProfile = () => {
  const { employeeId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api-v1/employee/get-employee/${employeeId}`, {
          withCredentials: true
        });
        console.log(response)
        setUser(response.data.employee[0]);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <Link to={`/employee`}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4">
          Return
        </button>
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full md:max-w-xl">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center">Employee Profile</h2>
        <hr className="border-b border-gray-200 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Full Name:</p>
            <p className="text-lg text-gray-900">{user.fullName}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">NIC Number:</p>
            <p className="text-lg text-gray-900">{user.NICNumber}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Email:</p>
            <p className="text-lg text-gray-900">{user.email}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Job Position:</p>
            <p className="text-lg text-gray-900">{user.jobPosition}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Job Category:</p>
            <p className="text-lg text-gray-900">{user.jobCategory}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Department:</p>
            <p className="text-lg text-gray-900">{user.department}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Gender:</p>
            <p className="text-lg text-gray-900">{user.gender}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Phone:</p>
            <p className="text-lg text-gray-900">{user.phone}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Company:</p>
            <p className="text-lg text-gray-900">{user.company}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">Start Date:</p>
            <p className="text-lg text-gray-900">{user.startDate}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2 text-gray-700">End Date:</p>
            <p className="text-lg text-gray-900">{user.endDate ? user.endDate : ""}</p>
          </div>
          {/* Add more fields here as needed */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
