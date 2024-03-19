import { IoMdSend } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How Gamage Recruiters work</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
              quos molestiae possimus eius soluta doloribus?
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find A Job/Post A Job</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
              quos molestiae possimus eius soluta doloribus?
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
              quos molestiae possimus eius soluta doloribus?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
