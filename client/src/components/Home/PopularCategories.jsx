import { FaReact } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbAppsFilled } from "react-icons/tb";
import {
  MdAccountBalance,
  MdOutlineAnimation,
  MdOutlineDesignServices,
  MdOutlineWebhook,
} from "react-icons/md";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "10 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "20 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "15 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN Stack Development",
      subTitle: "5 Open Positions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "12 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Video Animation",
      subTitle: "8 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 7,
      title: "Merchandiser",
      subTitle: "3 Open Positions",
      icon: <HiOutlineDocumentReport />,
    },
    {
      id: 8,
      title: "Food and Beverage Manager",
      subTitle: "7 Open Positions",
      icon: <IoFastFoodOutline />,
    },
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
