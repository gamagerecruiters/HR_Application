import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const AllEmployeesDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const formatDate = (dateString) => {
        if(!dateString){
            return ""
        }
        const date = new Date(dateString);

        // Extracting date components
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed, so adding 1
        const day = date.getDate();
        
        // Creating the date string
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        
        console.log(formattedDate); // Output: "2024-03-01"
        return formattedDate
      };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8800/api-v1/employee/all-employees",
                {
                    withCredentials: true,
                }
            );
            console.log(response)
            // Add id property to each employee object
            const employeesWithId = response.data.employees.map((employee) => ({
                ...employee,
                id: employee._id, // Use _id as the id
                birthDate: formatDate(employee.birthDate),
                startDate : formatDate(employee.startDate),
                endDate : formatDate(employee.endDate)
                

      }));
            setEmployees(employeesWithId);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching employees data:", error);
        }
    };

    const deleteEmployee = useCallback(async () => {
        try {
            await axios.delete(
                `http://localhost:8800/api-v1/employee/delete-employee/${deleteEmployeeId}`,
                {
                    withCredentials: true,
                }
            );
            // Once employee is deleted, you may want to refetch the updated employee list
            fetchEmployees();
            setDeleteEmployeeId(null); // Reset deleteEmployeeId after deletion
        } catch (error) {
            console.log("Error deleting employee:", error);
        }
    }, [deleteEmployeeId]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDeleteConfirmation = (employeeId) => {
        setDeleteEmployeeId(employeeId);
        setShowDeletePrompt(true);
    };

    const handleDeleteCancel = () => {
        setShowDeletePrompt(false);
    };

    const handleDeleteConfirm = () => {
        setShowDeletePrompt(false);
        deleteEmployee();
    };

    const columns = [
        { field: "fullName", headerName: "Full Name", width: 200 },
        { field: "NICNumber", headerName: "NIC Number", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "jobPosition", headerName: "Job Position", width: 200 },
        //{ field: "jobCategory", headerName: "Job Category", width: 150 },
        { field: "department", headerName: "Department", width: 150 },
        //{ field: "gender", headerName: "Gender", width: 120 },
        { field: "phone", headerName: "Phone", width: 150 },
        { field: "company", headerName: "Company", width: 200 },
        { field: "startDate", headerName: "Start Date", width: 200 },
        //{ field: "endDate", headerName: "End Date", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 400,
            renderCell: (params) => (
                <div className="flex items-center gap-2">
                    <Link to={`/employee/${params.row._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 m-2 ">
                            View
                        </button>
                    </Link>
                    <Link to={`/update-employee/${params.row._id}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4  m-2">
                            Edit
                        </button>
                    </Link>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 "
                        onClick={() => handleDeleteConfirmation(params.row._id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];


    const handleDownload = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8800/api-v1/employee/employee-report",
            {
              responseType: "blob",
              withCredentials: true,
            }
          );
    
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Employee-Report.pdf");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.log("Error downloading user report:", error);
        }
      };


    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">All Employees Details</h2>
                <div className=" flex justify-center gap-2">
                    <Link to={'/add-employee'}>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                            Add Employee
                        </button>
                    </Link>

                    {/* Add download functionality if needed */}

                    <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download
          </button>
                </div>
            </div>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={15}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
            {/* Delete Prompt */}
            {showDeletePrompt && (
                <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
                    <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white rounded-lg p-4 z-20">
                        <p className="text-lg font-semibold mb-4">
                            Are you sure you want to delete this employee?
                        </p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                                onClick={handleDeleteConfirm}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                                onClick={handleDeleteCancel}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllEmployeesDetails;
