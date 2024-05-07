import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllUsersDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

 /**
  * {
    "_id": "65e84a86e34a8bfc64d3965b",
    "firstName": "Mike",
    "lastName": "Due",
    "email": "Mikedue123@gmail.com",
    "designation": "Director and CEO",
    "employmentType": "Permanent",
    "userType": "Admin",
    "status": "Active",
    "phone": 123456789,
    "company": "Gamage Recruiters (Pvt) Ltd"
}
  */
 const tableFields = [ 
    "FirstName",
    "LastName",
    "Email",
    "Designation",
    "EmploymentType",
    "UserType",
    "Status",
    "phone",
    "Company"
 ]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api-v1/user/get-all-users',  {
            withCredentials: true
          } );
          console.log(response)
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching users data:', error);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {/* <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">User Type</th>
              <th className="px-4 py-2">User Type</th> */}
              {tableFields.map((field,index) => (
                <th key={index} className='px-4 py-2'>{field}</th>
              ))}

              {/* Add more table headers here if needed */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-gray-300">
                <td className="px-4 py-2">{user.firstName} </td>
                <td className="px-4 py-2">{user.lastname}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.designation}</td>
                <td className="px-4 py-2">{user.employmentType}</td>
                <td className="px-4 py-2">{user.userType}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.company}</td>
                <Link to={`/user/${user._id}`}>
                <td className="px-4 py-2">{"view"}</td>
                </Link>
                <td className="px-4 py-2">{"edit"}</td>
                <td className="px-4 py-2">{"delete"}</td>







                {/* Render more user details here if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersDetails;
