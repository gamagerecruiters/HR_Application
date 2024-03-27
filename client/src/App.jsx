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
import PasswordReset from "./components/User/PasswordReset";
import ForgotPassword from "./components/User/ForgotPassword";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersComponent from "./components/User/UsersComponent";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api-v1/auth/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/userComponent" element={<UsersComponent />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
        <Route path="/job/getAll" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<NotFound />} />

      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
