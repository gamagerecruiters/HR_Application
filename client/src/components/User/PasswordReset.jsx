import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled function

// Create a styled Container component
const StyledContainer = styled(Container)({
  marginTop: '64px', // Adjust the marginTop as needed
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

// Create a styled Form component
const StyledForm = styled('form')({
  width: '100%',
  marginTop: '10px', // Adjust the marginTop as needed
});

// Create a styled Button component
const StyledButton = styled(Button)({
  margin: '16px 0', // Adjust the margin as needed
});

const PasswordReset = () => {
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
    <StyledContainer component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Enter Your Email
      </Typography>
      <StyledForm onSubmit={handlePasswordResetHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleEmailChange}
          InputLabelProps={{
            shrink: !!email,
          }}
        />
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Submit
        </StyledButton>
      </StyledForm>
      {/* Display success message if available */}
      {successMessage && (
        <Typography variant="body1" color="success">
          {successMessage}
        </Typography>
      )}
      {/* Display error message if available */}
      {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
    </StyledContainer>
  );
};

export default PasswordReset;
