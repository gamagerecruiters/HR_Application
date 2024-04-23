import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api-v1/user/get-user/${id}`, {
          withCredentials: true
        });
        setUser(response.data.user[0]);
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
    return <div>User not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <Link to={`/user`}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4">
          Return
        </button>
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl w-full p-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">User Profile</h2>
        <hr className="border-b border-gray-200 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">First Name:</p>
            <p className="text-lg text-gray-900">{user.firstName}</p>
          </div>
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">Last Name:</p>
            <p className="text-lg text-gray-900">{user.lastName}</p>
          </div>
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">Email:</p>
            <p className="text-lg text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">Employment Type:</p>
            <p className="text-lg text-gray-900">{user.employmentType}</p>
          </div>
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">Status:</p>
            <p className="text-lg text-gray-900">{user.status}</p>
          </div>
          <div>
            <p className="text-lg font-medium mb-2 text-gray-700">Company:</p>
            <p className="text-lg text-gray-900">{user.company}</p>
          </div>
          {/* Add more fields here as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
