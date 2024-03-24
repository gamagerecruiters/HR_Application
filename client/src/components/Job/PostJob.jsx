import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState();
  const [jobPosition, setJobPosition] = useState();
  const [location, setLocation] = useState();
  const [experienceLevel, setExperienceLevel] = useState();
  const [jobCategory, setJobCategory] = useState();
  const [description, setDescription] = useState();
  const [expired, setExpired] = useState();

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api-v1/job/create-job",
        {
          jobTitle,
          jobPosition,
          location,
          experienceLevel,
          jobCategory,
          description,
          expired,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Job posted successfully", res.data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.userType !== "Admin")) {
    navigateTo("/login");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW JOB</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title"
              />
            </div>
            <div className="wrapper">
              <textarea
                rows="2"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </div>
            <div className="wrapper">
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="">Select Experience Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              >
                <option value="">Select Job Position</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="UX/UI Designer">UX/UI Designer</option>
                <option value="Graphic Designer">Graphic Designer</option>
                <option value="Marketing Manager">Marketing Manager</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="wrapper">
              <select
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
              >
                <option value="">Select Job Category</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={expired}
                onChange={(e) => setExpired(e.target.value)}
              >
                <option value={""}>Select Job Expiry</option>
                <option value={true}>Expired</option>
                <option value={false}>Not Expired</option>
              </select>
            </div>
            <div className="wrapper">
              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
