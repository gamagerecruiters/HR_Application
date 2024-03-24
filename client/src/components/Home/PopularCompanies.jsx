import { BiBuilding } from "react-icons/bi";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Gamage Recruiters",
      location: "676/1 Colombo - Galle Main Rd, Panadura",
      openPositions: 10,
      icon: <BiBuilding />,
    },
  ];
  return (
    <>
      <div className="companies">
        <div className="container">
          <h3>TOP COMPANIES</h3>
          <div className="banner">
            {companies.map((element) => {
              return (
                <div className="card" key={element.id}>
                  <div className="content">
                    <div className="icon">{element.icon}</div>
                    <div className="text">
                      <p>{element.title}</p>
                      <p>{element.location}</p>
                    </div>
                  </div>
                  <button>Open Positions {element.openPositions}</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCompanies;
