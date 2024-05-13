import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../../main";

const UpdateUser = () => {
  const { id } = useParams();
  const { setUser, user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    employmentType: "",
    status: "",
    userType: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api-v1/user/get-user/${id}`,
          {
            withCredentials: true,
          }
        );
        setFormData(response.data.user[0]);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        employmentType: formData.employmentType,
        designation: formData.designation,
      };
      const response = await axios.patch(
        `http://localhost:8800/api-v1/user/update-user/${id}`,
        userData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      // Handle success message or redirect user
      setUser({
        ...user,
        ...userData,
      });
      setUpdateSuccess(true); // Set update success status to true

      if (user.userType === "Admin") {
        const statusUpdateRes = await axios.put(
          `http://localhost:8800/api-v1/user/update-user-status/${id}`,
          { status: formData.status },
          {
            withCredentials: true,
          }
        );

        console.log("status res", statusUpdateRes);
      }
    } catch (error) {
      console.log("Error updating user:", error);
      // Handle error message
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="bg-gray-100  flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Enter phone"
              />
            </div>
            {user && user.userType === "Admin" ? (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Designation:
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="Enter designation"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Employment Type:
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="form-select w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    <option value="">Select employment type</option>
                    <option value="Intern">Intern</option>
                    <option value="Contract-Basis">Contract-Basis</option>
                    <option value="Permanent">Permanent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Status:
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    User Type:
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="form-select w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    <option value="">Select user type</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Update
          </button>
          {/* Success message */}
          {updateSuccess && (
            <p className="text-green-600 mt-2">
              User details updated successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
