import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordResetHandler = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to the backend route
      const response = await axios.post(
        "http://localhost:8800/api-v1/auth/sendPasswordLink",
        { email }
      );

      // Handle the response
      console.log(response.data); // Log the response data or handle it as needed
      setSuccessMessage("Password reset link sent successfully!");
      setErrorMessage(""); // Clear any previous error message

      // Optionally, you can reset the email field after successful submission
      setEmail("");
      
    } catch (error) {
      // Handle errors if any
      console.error("Error sending password reset link:", error);
      setErrorMessage("Error sending password reset link. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  // Clear error message when user starts typing in the email input field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(""); // Clear error message
    setSuccessMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">Enter Your Email</h1>
        <form onSubmit={handlePasswordResetHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address:
            </label>
            <input
              type="email"
              className="form-input w-full rounded-md"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Submit
          </button>
        </form>
        {/* Display success message if available */}
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
        {/* Display error message if available */}
        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
