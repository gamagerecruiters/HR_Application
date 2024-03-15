import "./App.css";
import axios from "axios";
import { Context } from "./main";
import Jobs from "./components/Job/Jobs";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import MyJobs from "./components/Job/MyJobs";
import { useEffect, useContext } from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import PostJob from "./components/Job/PostJob";
import Register from "./components/Auth/Register";
import JobDetails from "./components/Job/JobDetails";
import NotFound from "./components/NotFound/NotFound";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api-v1/auth/getUser",
          { withCredentials: true }
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job/getAll" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
