import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userValid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api-v1/auth/forgotpassword/${id}/${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response", response);

      if (response.status === 201) {
        console.log("user valid", response);
      } else {
        navigate("*");
        console.log("Invalid", response);
      }
    } catch (error) {
      navigate("*");
      // Handle errors
      console.log("Error:", error);
    }
  };

  const handleForgetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8800/api-v1/auth/reset-password/${id}/${token}`,
        {
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response", response);

      if (response.status === 201) {
        console.log("res", response);
        setSuccessMessage("Password reset successful!");
        setErrorMessage(""); // Clear any previous error message
      } else {
        console.log("No Result");
        setErrorMessage("Error resetting password. Please try again.");
        setSuccessMessage(""); // Clear any previous success message
      }
    } catch (error) {
      // Handle errors
      console.log("Error:", error);
      setErrorMessage("Error resetting password. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Enter Your New Password</h1>
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-8">
        <input
          id="password"
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage(""); // Clear error message when user starts typing
            setSuccessMessage(""); // Clear success message when user starts typing
          }}
          className="w-full bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-green-500 mb-4 py-2 px-4 rounded-md"
        />
        <button
          onClick={handleForgetPasswordHandler}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
        >
          Submit
        </button>
        {/* Display success message if available */}
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
        {/* Display error message if available */}
        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
        {/* Button to navigate to login page */}
        {successMessage && (
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full mt-4"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
