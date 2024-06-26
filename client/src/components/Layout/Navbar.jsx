import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api-v1/auth/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                HOME
              </Link>
            </li>

            

            <li>
              <Link to={"/job/getAll"} onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>

            <li>
              <Link to={"/myProfile"} onClick={() => setShow(false)}>
                MY PROFILE
              </Link>
            </li>

            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)}>
                {user && user.userType === "Admin"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            <li>
              {(user && user.userType === "Admin") && (
                <Link to={"/user"} onClick={() => setShow(false)}>
                  {"user".toUpperCase()}
                </Link>
              )}
            </li>
            <li>
              {(user && user.userType === "Admin") && (
                <Link to={"/employee"} onClick={() => setShow(false)}>
                  {"employee".toUpperCase()}
                </Link>
              )}
            </li>
            {user && user.userType === "Admin" ? (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            

            <button onClick={handleLogout}>LOGOUT</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
