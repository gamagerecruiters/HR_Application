import "./App.css";
import axios from "axios";
import { Context } from "./main";
import Jobs from "./components/Job/Jobs";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import MyJobs from "./components/Job/MyJobs";
import { useEffect, useContext } from "react";
import PostJob from "./components/Job/PostJob";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import Register from "./components/Auth/Register";
import JobDetails from "./components/Job/JobDetails";
import NotFound from "./components/NotFound/NotFound";
import ForgotPassword from "./components/User/ForgotPassword";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersComponent from "./components/User/UsersComponent";
import User from "./components/User/User";
import UserProfile from "./components/User/UserProfile";
import UpdateUser from "./components/User/UpdateUser";
import MyProfile from "./components/User/MyProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ResetPassword from "./components/User/ResetPassword";
import AddUser from "./components/User/AddUser";
import AllEmployeesDetails from "./components/Employee/AllEmployeeDetails";
import EmployeeProfile from "./components/Employee/EmployeeProfile";
import AddEmployee from "./components/Employee/AddEmployee";
import UpdateEmployee from "./components/Employee/UpdateEmployee";
import UserLeaveTable from "./components/Leave/UserLeaveTable";
import ApplyLeave from "./components/Leave/ApplyLeave";
import UpdateLeave from "./components/Leave/UpdateLeave";
import LeaveRequestByUsers from "./components/Leave/LeaveRequestByUsers";
import LeaveRequestBySupervisor from "./components/Leave/LeaveRequestBySupervisor";
import LeaveStatistics from "./components/Leave/LeaveStatistics";
import ShowLeave from "./components/Leave/ShowLeave";
import UserLeaveRenderPage from "./components/Leave/UserLeaveRenderPage";
import SupervisorLeaveRenderPage from "./components/Leave/SupervisorLeaveRenderPage";
import SuperAdminLeaveRenderPage from "./components/Leave/SuperAdminLeaveRenderPage";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser , user} = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api-v1/auth/getuser",
          {
            withCredentials: true,
          }
        );
        console.log(response)
        setUser(response.data.userResult);
        console.log("user", user)
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);

  const getLeavePage = () => {
    if(user.userType === "User"){
      return <UserLeaveRenderPage/>
    }
    else if (user.userType === "Admin"){
      return <SupervisorLeaveRenderPage/>
    }
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/password-reset" element={<ForgotPassword />} />
        <Route path="/forgotpassword/:id/:token" element={<ResetPassword />} />
        <Route path="/job/getAll" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<NotFound />} />

        {/* --------------- */}

        <Route path="/user" element={<User />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/edit-user/:id" element={<UpdateUser />} />
        <Route path="/userComponent" element={<UsersComponent />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/updatePassword/:id" element={<UpdatePassword />} />
        <Route path="/add-user" element={<AddUser />} />


        <Route path="/employee" element={<AllEmployeesDetails />} />
        <Route path="/employee/:employeeId" element={<EmployeeProfile />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/update-employee/:employeeId" element={<UpdateEmployee />} />


        {user && user.userType === "User" && <Route path="/leave" element={<UserLeaveRenderPage/>} />}
        {user && user.userType === "Admin" && <Route path="/leave" element={<SupervisorLeaveRenderPage/>} />}
        {user && user.userType === "SuperAdmin" && <Route path="/leave" element={<SuperAdminLeaveRenderPage/>} />}


        <Route path="/leave-statistics" element={<LeaveStatistics/>} />
        <Route path="/view-leave/:leaveId" element={<ShowLeave />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/update-leave/:leaveId" element={<UpdateLeave />} />
        <Route path="/leave-request-check-supervisor" element={<LeaveRequestByUsers />} />
        <Route path="/leave-request-check-admin" element={<LeaveRequestBySupervisor />} />












      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
