import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8800/api-v1/job/my-jobs",
          {
            withCredentials: true,
          }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.userType !== "Admin")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:8800/api-v1/job/update-job/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:8800/api-v1/job/delete-job/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => [toast.error(error.response.data.message)]);
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };
  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h3>YOUR POSTED JOBS</h3>
          {myJobs && myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Job Title: </span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.jobTitle}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "jobTitle",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Experience Level: </span>
                          <select
                            value={element.experienceLevel}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "experienceLevel",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="">Select Experience Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                        <div>
                          <span>Job Position: </span>
                          <select
                            value={element.jobPosition}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "jobPosition",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="">Select Job Position</option>
                            <option value="Software Engineer">
                              Software Engineer
                            </option>
                            <option value="QA Engineer">QA Engineer</option>
                            <option value="DevOps Engineer">
                              DevOps Engineer
                            </option>
                            <option value="Product Manager">
                              Product Manager
                            </option>
                            <option value="Project Manager">
                              Project Manager
                            </option>
                            <option value="Business Analyst">
                              Business Analyst
                            </option>
                            <option value="Data Analyst">Data Analyst</option>
                            <option value="Data Scientist">
                              Data Scientist
                            </option>
                            <option value="UX/UI Designer">
                              UX/UI Designer
                            </option>
                            <option value="Graphic Designer">
                              Graphic Designer
                            </option>
                            <option value="Marketing Manager">
                              Marketing Manager
                            </option>
                            <option value="Sales Manager">Sales Manager</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="Finance Manager">
                              Finance Manager
                            </option>
                            <option value="Customer Support">
                              Customer Support
                            </option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <span>Job Category: </span>
                          <select
                            value={element.jobCategory}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "jobCategory",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="">Select Job Category</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                            <option value="Other">Other</option>
                          </select>
                          <div>
                            <span>Job Expiry: </span>
                            <select
                              value={element.expired}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "expired",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value={""}>Select Job Expiry</option>
                              <option value={true}>Expired</option>
                              <option value={false}>Not Expired</option>
                            </select>
                          </div>
                        </div>
                        <div className="long_field">
                          <div>
                            <span>Description: </span>{" "}
                            <textarea
                              rows="5"
                              value={element.description}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "description",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            />{" "}
                            <span>Location: </span>
                            <textarea
                              rows="2"
                              value={element.location}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "location",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            />
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You&apos;ve not posted any job or may be you deleted all of your
              jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
