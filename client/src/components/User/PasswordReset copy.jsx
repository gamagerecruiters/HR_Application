import  { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
    const [email, setEmail] = useState("");

    async function handlePasswordResetHandler(e) {
        e.preventDefault();
        
        try {
            // Make a POST request to the backend route
            const response = await axios.post(
                "http://localhost:8800/api-v1/auth/sendPasswordLink",
                { email }
            );

            // Handle the response
            console.log(response.data); // Log the response data or handle it as needed

            // Optionally, you can reset the email field after successful submission
            setEmail("");
        } catch (error) {
            // Handle errors if any
            console.error("Error sending password reset link:", error);
        }
    }

    return (
        <div>
            <h2>Enter Your Email</h2> <br/>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handlePasswordResetHandler}>Submit</button>
        </div>
    );
}

export default PasswordReset;
