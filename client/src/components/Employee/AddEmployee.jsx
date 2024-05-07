import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    NICNumber: "",
    birthDate: "",
    email: "",
    jobPosition: "",
    jobCategory: "Full-time",
    department: "Other",
    gender: "Male",
    phone: "",
    company: "",
    startDate: "",
    endDate: "",
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

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api-v1/employee/create-employee",
        formData,
        {
            withCredentials: true,
        }

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
      <h1 className="text-3xl font-bold mb-8">Add New Employee</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="NICNumber"
            placeholder="NIC Number"
            value={formData.NICNumber}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="jobPosition"
            placeholder="Job Position"
            value={formData.jobPosition}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
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
          {/* Add other input fields for employee details */}

           <div className="mb-4">
            <label className="block mb-2">Birth Date:</label>
            <DatePicker
              selected={formData.birthDate}
              onChange={(date) => handleDateChange(date, "birthDate")}
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Start Date:</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">End Date:</label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div> 

          <div className="mb-4">
            <label className="block mb-2">Job Category:</label>
            <select
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Add Employee
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        {successMessage && (
          <>
            <p className="text-green-500 mt-4">{successMessage}</p>
            <div className="mt-4">
              <Link to={"/employee"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Go to Employees
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddEmployee;
