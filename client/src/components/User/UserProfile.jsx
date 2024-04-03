import  { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom"

const UserProfile = () => {
    const {id} = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api-v1/user/get-user/${id}`,  {
            withCredentials: true
          });
          console.log(response)
        setUser(response.data.user[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
    <div className="bg-white shadow-md rounded-lg overflow-hidden mx-auto max-w-md">
      <div className="p-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <p className="text-gray-700">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User Type:</label>
          <p className="text-gray-700">{user.userType}</p>
        </div>
        {/* Add more fields here as needed */}
      </div>
    </div>
  );
};

export default UserProfile;
