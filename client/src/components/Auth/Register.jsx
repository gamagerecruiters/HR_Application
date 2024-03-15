import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useContext, useState } from "react";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline, MdWork } from "react-icons/md";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [userType, setUserType] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api-v1/auth/register", // Path to the register route
        {
          email,
          password,
          phone,
          firstName,
          lastName,
          userType,
          designation,
          employmentType,
        },
        {
          withCredentials: false,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setUserType("");
      setDesignation("");
      setEmploymentType("");
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="">Select the user type</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Employment Type</label>
              <div>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  <option value="">Select the employment type</option>
                  <option value="Intern">Intern</option>
                  <option value="Contract-Basis">Contract Basis</option>
                  <option value="Permanent">Permanent</option>
                </select>
                <BsFillPersonVcardFill />
              </div>
            </div>
            <div className="inputTag">
              <label>First Name</label>
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Type your phone number"
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Last Name</label>
              <div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Type your phone number"
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email"
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Designation</label>
              <div>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Type your designation"
                />
                <MdWork />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone</label>
              <div>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Type your email"
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password"
                />
                <RiLock2Fill />
              </div>
            </div>
            <button onClick={handleRegister} type="submit">
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="" alt="register" />
        </div>
      </div>
    </>
  );
};

export default Register;
