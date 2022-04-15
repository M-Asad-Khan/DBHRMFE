import {
  updateNewEmployee,
  updateIsAddEmployeeClicked,
  updateEmployees,
  updateIsEditEmployeeClicked,
	updateEmployeesDataTable,
	updateIsViewEmpClicked
} from "./employees.types";

export const updateNewEmployeeAction = (params) => {
  return {
    type: updateNewEmployee,
    payload: params,
  };
};
export const updateIsAddEmployeeClickedAction = (params) => {
	debugger;
  return {
    type: updateIsAddEmployeeClicked,
    payload: params,
  };
};

export const updateEmployeesAction = (params) => {
  return {
    type: updateEmployees,
    payload: params,
  };
};
export const updateIsEditEmployeeClickedAction = (params) => {
  return {
    type: updateIsEditEmployeeClicked,
    payload: params,
  };
};
export const updateEmployeesDataTableAction = (params) => {
  return {
    type: updateEmployeesDataTable,
    payload: params,
  };
};
export const updateIsViewEmpClickedAction = (params) => {
  return {
    type: updateIsViewEmpClicked,
    payload: params,
  };
};
// export const updateIsViewClickedAction = (params) => {
//   return {
//     type: updateIsViewClicked,
//     payload: params,
//   };
// };
