import { combineReducers } from "redux";

import employeesReducer from "./Employees/employees.reducer";
import clientsReducer from "./Clients/clients.reducer";
import teamsReducer from "./Teams/teams.reducer";
import appSidebarReducer from "./AppSidebar/appSidebar.reducer";
import userManagmentReducer from "./UserManagment/userManagment.reducer";
import candidate from "./Candidates/candidates.reducer"

const rootReducer = combineReducers({
  employees: employeesReducer,
  clients: clientsReducer,
  teams: teamsReducer,
  appSidebar: appSidebarReducer,
  userManagment: userManagmentReducer,
  candidate: candidate,
});

export default rootReducer;
