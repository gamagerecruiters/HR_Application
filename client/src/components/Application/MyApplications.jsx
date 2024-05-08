import axios from "axios";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { useContext, useEffect, useState } from "react";
import generateReport from "./reportGenerator";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeFileUrl, setResumeFileUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = "http://localhost:8800/api-v1/application/user-getAll";
        if (user && user?.userType === "Admin") {
          endpoint = "http://localhost:8800/api-v1/application/admin-getAll";
        }

        const applicationRes = await axios.get(endpoint, {
          withCredentials: true,
        });
        const jobRes = await axios.get(
          "http://localhost:8800/api-v1/job/getAll",
          { withCredentials: true }
        );

        console.log(jobRes.data.jobs);

        const jobs = jobRes.data.jobs;
        const applications = applicationRes.data.applications.map(
          (application) => {
            const job = jobs.find((job) => job._id === application.jobId);
            return {
              ...application,
              jobTitle: job ? job.title : "Job not found",
            };
          }
        );

        setApplications(applications);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const deleteApplication = async (id) => {
    try {
      axios
        .delete(
          `http://localhost:8800/api-v1/application/user-delete-application/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (fileUrl) => {
    setResumeFileUrl(fileUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section className="my_applications page">
        {user && user?.userType === "User" ? (
          <div className="container">
            <h3>My Applications</h3>
            {applications.length <= 0 ? (
              <>
                {" "}
                <h4>No Applications Found</h4>{" "}
              </>
            ) : (
              applications.map((element) => {
                return (
                  <UserCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                    applications={applications}
                  />
                );
              })
            )}
          </div>
        ) : (
          <div className="container">
            <h3>Applications From Applicants</h3>
            {applications.length <= 0 ? (
              <>
                {" "}
                <h4>No Applications Found</h4>{" "}
              </>
            ) : (
              applications.map((element) => {
                return (
                  <AdminCard
                    element={element}
                    key={element._id}
                    openModal={openModal}
                    applications={applications}
                  />
                );
              })
            )}
          </div>
        )}
        {modalOpen && (
          <ResumeModal fileUrl={resumeFileUrl} onClose={closeModal} />
        )}
      </section>
    </>
  );
};

export default MyApplications;

const UserCard = ({ element, deleteApplication, openModal, applications }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span>
            {element.name}
          </p>
          <p>
            <span>Email:</span>
            {element.email}
          </p>
          <p>
            <span>Phone:</span>
            {element.phone}
          </p>
          <p>
            <span>Address:</span>
            {element.address}
          </p>
          <p>
            <span>CoverLetter:</span>
            {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <object
            data={element.resume.url}
            type="application/pdf"
            width="100%"
            height="100%"
            onClick={() => openModal(element.resume.url)}
          ></object>
          <p
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "15px",
            }}
          >
            Download the resume <a href={element.resume.url}>click here</a>
          </p>
          <p style={{ fontSize: "15px" }}>
            Generate report{" "}
            <button onClick={() => generateReport(applications)}>
              Click here
            </button>
          </p>
        </div>

        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const AdminCard = ({ element, openModal, applications }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Job Applied:</span>
            {element.jobTitle}
          </p>
          <p>
            <span>Name:</span>
            {element.name}
          </p>
          <p>
            <span>Email:</span>
            {element.email}
          </p>
          <p>
            <span>Phone:</span>
            {element.phone}
          </p>
          <p>
            <span>Address:</span>
            {element.address}
          </p>
          <p>
            <span>CoverLetter:</span>
            {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <object
            data={element.resume.url}
            type="application/pdf"
            width="100%"
            height="100%"
            onClick={() => openModal(element.resume.url)}
          ></object>
          <p
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "15px",
            }}
          >
            Download the resume <a href={element.resume.url}>click here</a>
          </p>
          <p style={{ fontSize: "15px" }}>
            Generate report{" "}
            <button onClick={() => generateReport(applications)}>
              Click here
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
