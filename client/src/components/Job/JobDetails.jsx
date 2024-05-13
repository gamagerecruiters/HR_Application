import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api-v1/job/${id}`, { withCredentials: true })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((err) => {
        console.log(err.response.data.json);
      });
  }, []);

  console.log(job);

  if (!isAuthorized) navigateTo("/login");

  return (
    <>
      <div className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Job Title: <span>{job.jobTitle}</span>
            </p>
            <p>
              Job Position: <span>{job.jobPosition}</span>
            </p>
            <p>
              Location: <span>{job.location}</span>
            </p>
            <p>
              Experience Level: <span>{job.experienceLevel}</span>
            </p>
            <p>
              Job Category: <span>{job.jobCategory}</span>
            </p>
            <p>
              Description: <span>{job.description}</span>
            </p>
            <p>
              Job Posted On: <span>{job.datePosted}</span>
            </p>
            <p>
              Job Expired:{" "}
              <span>
                {job && job.expired !== undefined
                  ? job.expired.toString()
                  : "Loading..."}
              </span>
            </p>
            <p>
              {user && user.userType === "Admin" ? (
                <></>
              ) : (
                <Link to={`/application/${job._id}`}>Apply Now</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
