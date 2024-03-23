import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const { id, token } = useParams();

  const history = useNavigate();

  const [password, setPassword] = useState("");

  const [data2, setData] = useState(false);

  const userValid = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api-v1/user/forgotpassword/${id}/${token}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response" , response)


      if (response.status === 201) {
        console.log("user valid", response);
      } else {
        console.log("Invalid", response)
        history("*");
      }
    } catch (error) {
      // Handle errors
      console.log("Error:", error);
    }
  };

  const handleForgetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8800/api-v1/user/reset-password/${id}/${token}`,
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

  //   const updatePassword = async (id, token, password) => {
  //     try {
  //         const response = await axios.post(`/${id}/${token}`, {
  //             password
  //         }, {
  //             headers: {
  //                 "Content-Type": "application/json"
  //             }
  //         });

  //         if (response.status === 201) {
  //             setPassword("");
  //             setMessage(true);
  //         } else {
  //             toast.error("! Token Expired generate new LInk", {
  //                 position: "top-center"
  //             });
  //         }
  //     } catch (error) {
  //         // Handle errors
  //         console.error("Error:", error);
  //     }
  // }

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
