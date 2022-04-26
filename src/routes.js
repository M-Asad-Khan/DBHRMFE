import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const Login = React.lazy(() => import("./views/pages/login/Login.js"));
const Employee = React.lazy(() => import("./views/Employees/Index"));
const Clients = React.lazy(() => import("./views/Clients/Index"));
const Teams = React.lazy(() => import("./views/Teams/index"));
const jobPosting = React.lazy(() => import("./views/JobPosting/jobPosting"));
const UserManagment = React.lazy(() => import("./views/UserManagment/index"));
const interviewFeedback = React.lazy(() => import("./views/interviewFeedback/interviewFeedback")); 

const routes = [
  { path: "/Employee", exact: true, name: "Employee", component: Employee },
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/login", name: "Login", component: Login },
  { path: "/clients", exact: true, name: "Clients", component: Clients },
  { path: "/teams", exact: true, name: "Teams", component: Teams },
  {
    path: "/jobPosting",
    exact: true,
    name: "Job Posting",
    component: jobPosting,
  },
  {
    path: "/userManagment",
    exact: true,
    name: "User Managment",
    component: UserManagment,
  },
  {
    path: "/interviewFeedback",
    exact: true,
    name: "Interview Feedback",
    component: interviewFeedback,
  },
];

export default routes;
