import {
  updateNewEmployee,
  updateIsAddEmployeeClicked,
  updateEmployees,
  updateIsEditEmployeeClicked,
  updateEmployeesDataTable,
  updateIsViewClicked,
} from "./employees.types";

const INITIAL_STATE = {
  employees: [],
  newEmployee: {},
  isAddEmployeeCicked: null,
  isEditEmployeeClicked: null,
  employeesDataTable: {
    columns: [
      {
        label: "Employee Name",
        field: "name",
        width: 270,
      },
      {
        label: "Designation",
        field: "designation",
        width: 200,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],
    rows: [],
  },
  isViewClicked:null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case updateNewEmployee:
      return {
        ...state,
        newEmployee: action.payload,
      };

    case updateEmployees:
      return {
        ...state,
        employees: action.payload,
      };

    case updateIsAddEmployeeClicked:
      return {
        ...state,
        isAddEmployeeCicked: action.payload,
      };

    case updateIsEditEmployeeClicked:
      return {
        ...state,
        isEditEmployeeClicked: action.payload,
      };
    case updateEmployeesDataTable:
      return {
        ...state,
        employeesDataTable: action.payload,
      };
      case updateIsViewClicked:
				return {
					...state,
					isViewClicked: action.payload,
				};

    default:
      return state;
  }
};

export default reducer;
