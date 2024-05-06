import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateEmployee = () => {
  const { employeeId } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    NICNumber: "",
    birthDate: null,
    email: "",
    jobPosition: "",
    jobCategory: "",
    department: "",
    gender: "",
    phone: "",
    company: "",
    startDate: null,
    endDate: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api-v1/employee/get-employee/${employeeId}`,
          { withCredentials: true }
        );
        setFormData(response.data.employee[0]);
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8800/api-v1/employee/update-employee/${employeeId}`,
        formData,
        { withCredentials: true }
      );
      setSuccessMessage("Employee details updated successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error updating employee details");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Update Employee</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            placeholder="Full Name"
          />
          {/* NIC Number */}
          <input
            type="text"
            name="NICNumber"
            value={formData.NICNumber}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            placeholder="NIC Number"
          />
          {/* Birth Date */}
          <DatePicker
            selected={new Date(formData.birthDate)}
            onChange={(date) => handleDateChange(date, "birthDate")}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            placeholder="Email"
          />
          {/* Job Position */}
          <input
            type="text"
            name="jobPosition"
            value={formData.jobPosition}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            placeholder="Job Position"
          />
          {/* Job Category */}
          <select
            name="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 mb-4"
          >
            <option value="" disabled>
              Select Job Category
            </option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Other">Other</option>
          </select>
          {/* Department */}
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 mb-4"
          >
            <option value="" disabled>
              Select Department
            </option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Other">Other</option>
          </select>
          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 mb-4"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {/* Phone */}
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            placeholder="Phone (optional)"
          />
          {/* Company */}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            placeholder="Company"
          />
          {/* Start Date */}
          <DatePicker
            selected={new Date(formData.startDate)}
            onChange={(date) => handleDateChange(date, "startDate")}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          {/* End Date */}
          <DatePicker
            selected={formData.endDate ? new Date(formData.endDate) : null}
            onChange={(date) => handleDateChange(date, "endDate")}
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
          />
          {/* Error message */}
          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}
          {/* Success message */}
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
