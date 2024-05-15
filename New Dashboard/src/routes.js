import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import EmpTable from "views/employee/EmpTable";
import JobTable from "views/jobs/JobTable";
import ApplicationTable from "views/application/ApplicationTable";
import LeavesTable from "views/leaves/LeavesTable";
import LeavesApplyForm from "views/leaves/LeavesApplyForm";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/leaves",
    name: "Leaves",
    icon: "ni ni-calendar-grid-58 text-purple",
    component: <LeavesTable />,
    layout: "/admin",
  },
  {
    path: "/leaves/apply",
    name: "Leave Request",
    icon: "ni ni-curved-next text-default",
    component: <LeavesApplyForm />,
    layout: "/admin",
  },
  {
    path: "/jobs",
    name: "Jobs",
    icon: "ni ni-briefcase-24 text-orange",
    component: <JobTable />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-circle-08 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/application",
    name: "Application",
    icon: "ni ni-folder-17 text-red",
    component: <ApplicationTable />,
    layout: "/admin",
  },
  {
    path: "/employee",
    name: "Employee",
    icon: "ni ni-single-02 text-red",
    component: <EmpTable />,
    layout: "/admin",
  },
  {
    path: "/salary",
    name: "Salary",
    icon: "ni ni-money-coins text-green",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/programs",
    name: "Programs",
    icon: "ni ni-archive-2 text-default",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
