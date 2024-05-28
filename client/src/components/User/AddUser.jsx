import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    employmentType: "Intern",
    userType: "Admin",
    status: "Active",
    supervisorId: ""
  });

  const [supervisors, setSupervisors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch supervisors
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api-v1/user/admins", {withCredentials : true});
        console.log("supervisors", response)
        setSupervisors(response.data.users);
        console.log(supervisors)
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };

    fetchSupervisors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api-v1/auth/register",
        formData
      );
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Add New User</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          >
            <option value="Intern">Intern</option>
            <option value="Contract">Contract</option>
            <option value="FullTime">Full Time</option>
          </select>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="SuperAdmin">Super Admin</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            name="supervisorId"
            value={formData.supervisorId}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          >
            <option value="">Select Supervisor</option>
            {supervisors.map((supervisor) => (
              <option key={supervisor._id} value={supervisor._id}>
                {supervisor.firstName} {supervisor.lastName}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Add User
          </button>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddUser;
