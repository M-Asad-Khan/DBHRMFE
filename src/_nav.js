import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilChartPie,
  cilCursor,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilLockLocked,
} from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";

const Admin_nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Resource Plaining",
    to: "/dashboard",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Client",
        to: "/clients",
      },
      {
        component: CNavItem,
        name: "Employee",
        to: "/Employee",
      },
      {
        component: CNavItem,
        name: "Teams",
        to: "/teams",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "HR",
    to: "/buttons",
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: "Employee Details",
        to: "/buttons",
        items: [
          {
            component: CNavItem,
            name: "Employee Evaluation",
            to: "/employeeEvaluation",
          },
        ],
      },
      {
        component: CNavGroup,
        name: "Recruitment",
        to: "/buttons",
        items: [
          {
            component: CNavItem,
            name: "Job Posting",
            to: "/jobPosting",
          },
          {
            component: CNavItem,
            name: "Interview Feedback",
            to: "/interviewFeedback",
          },
          {
            component: CNavItem,
            name: "Candidates",
            to: "/candidates",
          },
        
        ],
      },
    ],
    
  },
  {
    component: CNavGroup,
    name: "Accounts",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [],
  },
  {
    component: CNavItem,
    name: "Attendence",
    to: "/charts",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Logout",
    to: "/login",
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "User Managment",
    to: "/userManagment",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
];

const HumanResource_nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Resource Plaining",
    to: "/dashboard",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Client",
        to: "/clients",
      },
      {
        component: CNavItem,
        name: "Employee",
        to: "/Employee",
      },
      {
        component: CNavItem,
        name: "Teams",
        to: "/teams",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "HR",
    to: "/buttons",
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: "Employee Details",
        to: "/buttons",
        items: [
          {
            component: CNavItem,
            name: "Employee Evaluation",
            to: "/employeeEvaluation",
          },
        ],
      },
      {
        component: CNavGroup,
        name: "Recruitment",
        to: "/buttons",
        items: [
          {
            component: CNavItem,
            name: "Job Posting",
            to: "/jobPosting",
          },
          {
            component: CNavItem,
            name: "Interview Feedback",
            to: "/interviewFeedback",
          },
          {
            component: CNavItem,
            name: "Candidates",
            to: "/candidates",
          },
        
        ],
      },
    ],
    
  },
  {
    component: CNavGroup,
    name: "Accounts",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [],
  },
  {
    component: CNavItem,
    name: "Attendence",
    to: "/charts",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Logout",
    to: "/login",
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  }
];

const Employee_nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },
  {
    component: CNavGroup,
    name: "Resource Plaining",
    to: "/dashboard",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
  
      {
        component: CNavItem,
        name: "Employee",
        to: "/Employee",
      },
      {
        component: CNavItem,
        name: "Teams",
        to: "/teams",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Accounts",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [],
  },
  {
    component: CNavItem,
    name: "Attendence",
    to: "/charts",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Logout",
    to: "/login",
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  }
];

const Client_nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Resource Plaining",
    to: "/dashboard",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Client",
        to: "/clients",
      },
      {
        component: CNavItem,
        name: "Teams",
        to: "/teams",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Logout",
    to: "/login",
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  }
];
export {Admin_nav,HumanResource_nav,Employee_nav,Client_nav};
