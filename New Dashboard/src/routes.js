import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import EmpTable from "views/employee/EmpTable";
import JobTable from "views/JobTable";
import ApplicationTable from "views/ApplicationTable";
import LeavesTable from "views/leaves/LeavesTable";
import LeavesApplyForm from "views/leaves/LeavesApplyForm";
import Programs from "views/examples/Programs";
import SalarySheet from "views/examples/Salary";
import ApplyEmployee from "views/examples/ApplyEmployee";
import AddJobs from "views/examples/AddJobs";
import ViewTickets from "views/tickets/ViewTickets";
import TicketSystem from "views/tickets/TicketSystem";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/add-jobs",
    name: "Add Jobs",
    icon: "ni ni-briefcase-24 text-orange",
    component: <AddJobs />,
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
    path: "/apply-employee",
    name: "Apply Employee",
    icon: "ni ni-single-02 text-red",
    component: <ApplyEmployee />,
    layout: "/admin",
  },
  {
    path: "/salary",
    name: "Salary",
    icon: "ni ni-money-coins text-green",
    component: <SalarySheet />,
    layout: "/admin",
  },
  {
    path: "/programs",
    name: "Programs",
    icon: "ni ni-archive-2 text-default",
    component: <Programs />,
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
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-single-copy-04 text-blue",
    component: <ViewTickets/>,
    layout: "/admin",
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-single-copy-04 text-blue",
    component: <TicketSystem/>,
    layout: "/user",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-circle-08 text-yellow",
    component: <Profile />,
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
