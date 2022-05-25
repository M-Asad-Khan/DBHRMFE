import {
    updateNewEmployeeEvaluation,
    updateIsAddEmployeeEvaluationClicked,
    updateEmployeesEvaluation,
    updateIsEditEmployeeEvaluationClicked,
    updateEmployeesEvaluationDataTable,
    updateIsViewEmpEvaluationClicked,
  } from "./employeeEvaluation.types";
  
  const INITIAL_STATE = {
    employeesEvaluation: [],
    newEvaluation: {},
    isAddEmployeeEvaluationClicked: null,
    isEditEmployeeEvaluationClicked: null,
    employeesEvaluationDataTable: {
      columns: [
        {
          label: "Employee Name",
          field: "employeeName",
          width: 270,
        },
        {
          label: "Team Lead",
          field: "teamLeadName",
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
    isViewEmpEvaluationClicked:null
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case updateNewEmployeeEvaluation:
        debugger
        return {
          ...state,
          newEvaluation: action.payload,
        };
  
      case updateEmployeesEvaluation:
        return {
          ...state,
          employeesEvaluation: action.payload,
        };
  
      case updateIsAddEmployeeEvaluationClicked:
              debugger;
        return {
          ...state,
          isAddEmployeeEvaluationClicked: action.payload,
        };
  
      case updateIsEditEmployeeEvaluationClicked:
        return {
          ...state,
          isEditEmployeeEvaluationClicked: action.payload,
        };
      case updateEmployeesEvaluationDataTable:
        return {
          ...state,
          employeesEvaluationDataTable: action.payload,
        };
      case updateIsViewEmpEvaluationClicked:
                  return {
                      ...state,
                      isViewEmpEvaluationClicked: action.payload,
                  };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  