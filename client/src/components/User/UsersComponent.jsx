import  { useEffect, useState } from 'react';
import axios from 'axios';

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api-v1/user/get-all-users' , {
          withCredentials: true
        });
        setUsers(response.data.users);
        console.log(response)
      } catch (error) {
        console.log('Error fetching users:', error);
        // Handle error here
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {users && users.map((user) => (
          <li key={user._id}>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            {/* Add other user properties you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersComponent;
