import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Login = React.lazy(() => import("./views/pages/login/Login.js"));
const Employee = React.lazy(() => import("./views/Employees/Index"));
const Clients = React.lazy(() => import("./views/Clients/Index"));
const Teams = React.lazy(() => import("./views/Teams/index"));
const jobPosting = React.lazy(() => import("./views/JobPosting/Index"));
const UserManagment = React.lazy(() => import("./views/UserManagment/index"));
const interviewFeedback = React.lazy(() =>import("./views/interviewFeedback/Index"));
const candidates = React.lazy(() => import("./views/Candidates/Index"));
const employeeEvaluation = React.lazy(() => import("./views/employeeEvaluation/Index"));
const employeeLeaves= React.lazy(() => import("./views/Employees/Leaves/index"));
const leavesView=React.lazy(()=>import("./views/Leaves/Leaves/index"))
const attendance=React.lazy(()=>import("./views/attendance/index"))
const helpDesk=React.lazy(()=>import("./views/helpdesk/index"));
const helpDeskTickets=React.lazy(()=>import("./views/helpdesk/adminView"))
const Profile = React.lazy(()=> import("./views/UserManagment/User/Profile"))


export const adminRoutes = [
  { path: "/Employee", exact: true, name: "Employee", component: Employee },
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard",exact: true, name: "Dashboard", component: Dashboard },
  { path: "/login",exact: true, name: "Login", component: Login },
  { path: "/clients", exact: true, name: "Clients", component: Clients },
  { path: "/teams", exact: true, name: "Teams", component: Teams },
  { path: "/jobPosting",exact: true,name: "Job Posting",component: jobPosting},
  { path: "/userManagment",exact: true,name: "User Managment",component: UserManagment},
  { path: "/interviewFeedback", exact: true, name: "Interview Feedback", component: interviewFeedback },
  { path: "/candidates",exact: true,name: "Candidates",component: candidates},
  { path: "/employeeEvaluation",exact: true,name: "Employee Evaluation",component: employeeEvaluation},
  { path: "/employeeLeaves",exact: true,name: "Employee Leaves",component: employeeLeaves},
  { path: "/leavesView",exact: true,name: "Employee Leaves",component: leavesView},
  { path: "/attendance",exact: true,name: "Employee Leaves",component: attendance},
  { path: "/helpdesk",exact: true,name: "Employee Leaves",component: helpDesk},
  { path: "/helpdesktickets",exact: true,name: "Employee Leaves",component: helpDeskTickets},
  { path: "/profile", exact: true, name: " User Profile ", component: Profile }
  
];
export const HRRoutes = [
  { path: "/Employee", exact: true, name: "Employee", component: Employee },
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard",exact: true, name: "Dashboard", component: Dashboard },
  { path: "/login",exact: true, name: "Login", component: Login },
  { path: "/clients", exact: true, name: "Clients", component: Clients },
  { path: "/teams", exact: true, name: "Teams", component: Teams },
  { path: "/jobPosting",exact: true,name: "Job Posting",component: jobPosting},
  { path: "/interviewFeedback", exact: true, name: "Interview Feedback", component: interviewFeedback },
  { path: "/candidates",exact: true,name: "Candidates",component: candidates},
  { path: "/employeeLeaves",exact: true,name: "Employee Leaves",component: employeeLeaves},
  { path: "/employeeEvaluation",exact: true,name: "Employee Evaluation",component: employeeEvaluation},
  { path: "/helpdesk",exact: true,name: "Employee Leaves",component: helpDesk},
  { path: "/leavesView",exact: true,name: "Employee Leaves",component: leavesView},
  { path: "/helpdesktickets",exact: true,name: "Employee Leaves",component: helpDeskTickets},
  { path: "/profile", exact: true, name: " User Profile ", component: Profile }
];
export const EmployeRoutes = [
  { path: "/Employee", exact: true, name: "Employee", component: Employee },
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard",exact: true, name: "Dashboard", component: Dashboard },
  { path: "/login",exact: true, name: "Login", component: Login },
  { path: "/teams", exact: true, name: "Teams", component: Teams },
  { path: "/jobPosting",exact: true, name: "Job Posting",component: jobPosting},
  { path: "/interviewFeedback", exact: true, name: "Interview Feedback", component: interviewFeedback },
  { path: "/candidates",exact: true,name: "Candidates",component: candidates},
  { path: "/employeeEvaluation",exact: true,name: "Employee Evaluation",component: employeeEvaluation},
  { path: "/helpdesk",exact: true,name: "Employee Leaves",component: helpDesk},
  { path: "/employeeLeaves",exact: true,name: "Employee Leaves",component: employeeLeaves},
  { path: "/profile", exact: true, name: " User Profile ", component: Profile }
];
export const ClientRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard",exact: true, name: "Dashboard", component: Dashboard },
  { path: "/login",exact: true, name: "Login", component: Login },
  { path: "/clients", exact: true, name: "Clients", component: Clients },
  { path: "/teams", exact: true, name: "Teams", component: Teams },
  { path: "/helpdesk",exact: true,name: "Employee Leaves",component: helpDesk},
  { path: "/profile", exact: true, name: " User Profile ", component: Profile }
];