import { useState } from "react";
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
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        formData,

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
            placeholder="Phone (optional)"
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
          <div className="mb-4">
            <label htmlFor="employmentType" className="block mb-2">
              Employment Type
            </label>
            <select
              name="employmentType"
              id="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              <option value="Intern">Intern</option>
              <option value="Contract-Basis">Contract-Basis</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="userType" className="block mb-2">
              User Type
            </label>
            <select
              name="userType"
              id="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Add User
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
        {successMessage && (
          <>
            <p className="text-green-500 mt-4">{successMessage}</p>
            {/* Button to navigate to Users component after successful registration */}
            <div className="mt-4">
              <Link to={"/user"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Go to Users
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddUser;
