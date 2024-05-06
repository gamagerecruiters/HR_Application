import  { useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom"


const UpdatePassword = () => {
    const {id} = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Assuming you have an endpoint to update the password
            const response = await axios.put(`http://localhost:8800/api-v1/auth/update-user-password/${id}`, { password },  {
                withCredentials: true,
              });
            setSuccessMessage(response.data.message);
            setPassword("");
            setConfirmPassword("");
            setError(null);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 h-screen">
            <h2 className="text-2xl font-bold mb-4">Update Password</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Update Password</button>
            </form>
        </div>
    );
}

export default UpdatePassword;
