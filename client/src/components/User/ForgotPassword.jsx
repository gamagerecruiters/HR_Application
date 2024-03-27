import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const { id, token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [data2, setData] = useState(false);

  const userValid = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api-v1/auth/forgotpassword/${id}/${token}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response" , response)


      if (response.status === 201) {
        console.log("user valid", response);
      } else {
        navigate("*");
        console.log("Invalid", response)
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

      console.log("Response" , response)

      if (response.status === 201) {
        console.log("res", response)
      } else {
        console.log("No Result")
      }
    } catch (error) {
      // Handle errors
      console.log("Error:", error);
    }
  };

  
  useEffect(() => {
    userValid()
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);
  return (
    <div>
      {data2 && <p>okay</p> }
      <h1>Enter Your New Password</h1>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleForgetPasswordHandler}>Submit</button>
    </div>
  );
};

export default ForgotPassword;
