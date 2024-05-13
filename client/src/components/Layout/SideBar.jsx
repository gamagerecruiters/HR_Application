const SideBar = () => {
  const sideBarItemsList = [
    { image: "", name: "Menu" },
    { image: "", name: "Dashboard" },
    { image: "", name: "Leaves" },
    { image: "", name: "Jobs" },
    { image: "", name: "Application" },
    { image: "", name: "Employee" },
    { image: "", name: "Salary" },
    { image: "", name: "Program" },
    { image: "", name: "Profile" },
    { image: "", name: "Log Out" },
  ];
  return (
    <div className=" flex flex-col lg:w-1/3">
      {/* Logo and Company Name */}
      <div className=" flex flex-row">
        <img src="" alt="" />
        <div>
          <span>Gamage</span>
          <span>Recruiters</span>
        </div>
      </div>

      {/* Side Bar Items */}
      <div>
        {sideBarItemsList.map((item,index) => {
          <div key={index}>
            {/* Logo */}

            {/* Item name */}
            <span>{item.name}</span>
          </div>;
        })}
      </div>
    </div>
  );
};

export default SideBar;
