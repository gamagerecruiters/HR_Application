import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const AllUsersDetails1 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api-v1/user/get-all-users",
        {
          withCredentials: true,
        }
      );
      // Add id property to each user object
      const usersWithId = response.data.users.map((user) => ({
        ...user,
        id: user._id, // Use _id as the id
      }));
      setUsers(usersWithId);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users data:", error);
    }
  };

  const deleteUser = useCallback(async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/api-v1/user/delete-user/${userId}`, {
        withCredentials: true,
      });
      // Once user is deleted, you may want to refetch the updated user list
      //fetchUsers();
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  });
  
  useEffect(() => {
    fetchUsers();
  }, [deleteUser]);

  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns1 = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "designation", headerName: "Designation", width: 200 },
    { field: "employmentType", headerName: "Employment Type", width: 200 },
    { field: "userType", headerName: "User Type", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "company", headerName: "Company", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Link to={`/user/${params.row._id}`}><button className=" bg-green-600 text-white p-2 m-2 ">View</button></Link> | <Link to={`/edit-user/${params.row._id}`}>Edit</Link>  |
          <button onClick={() => deleteUser(params.row._id)}>Delete</button>
        </>
      ),
    },
  ];

  const columns2 = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "designation", headerName: "Designation", width: 200 },
    { field: "employmentType", headerName: "Employment Type", width: 200 },
    { field: "userType", headerName: "User Type", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "company", headerName: "Company", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <Link to={`/user/${params.row._id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-full mr-2">
              View
            </button>
          </Link>
          <Link to={`/edit-user/${params.row._id}`}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-full mr-2">
              Edit
            </button>
          </Link>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-full"
            onClick={() => deleteUser(params.row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "designation", headerName: "Designation", width: 200 },
    { field: "employmentType", headerName: "Employment Type", width: 200 },
    { field: "userType", headerName: "User Type", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "company", headerName: "Company", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Link to={`/user/${params.row._id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 m-2 ">
              View
            </button>
          </Link>
          <Link to={`/edit-user/${params.row._id}`}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4  m-2">
              Edit
            </button>
          </Link>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 "
            onClick={() => deleteUser(params.row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  
  

  const getRowStyle = (params) => {
    if (params.row.status === 'Active') {
      return { backgroundColor: 'green' };
    } else if (params.row.status === 'Inactive') {
      return { backgroundColor: 'red' };
    }
    return {};
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api-v1/user/generate-user-report",
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "User-Report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log("Error downloading user report:", error);
    }
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Users Details</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          getRowStyle={getRowStyle}
        />
      </div>
    </div>
  );
};

export default AllUsersDetails1;
