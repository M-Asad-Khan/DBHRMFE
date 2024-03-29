import {
    updateNewEmployeeEvaluation,
    updateIsAddEmployeeEvaluationClicked,
    updateEmployeesEvaluation,
    updateIsEditEmployeeEvaluationClicked,
    updateEmployeesEvaluationDataTable,
    updateIsViewEmpEvaluationClicked,
    updateIsAddMemberDetailsClicked,
    updateIsAddTeamDetailsClicked,
} from "./employeeEvaluation.types";

const INITIAL_STATE = {
    employeesEvaluation: [],
    newEvaluation: {},
    isAddEmployeeEvaluationClicked: null,
    isEditEmployeeEvaluationClicked: null,
    isAddMemberDetails: [],
    isAddTeamDetails: [],
    employeesEvaluationDataTable: {
        columns: [{
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
                label: "Date of Evaluation",
                field: "dateOfEvaluation",
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
    isViewEmpEvaluationClicked: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case updateNewEmployeeEvaluation:
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
        case updateIsAddMemberDetailsClicked:

            return {
                ...state,
                isAddMemberDetails: action.payload,
            };

        case updateIsAddTeamDetailsClicked:
            return {
                ...state,
                isAddTeamDetails: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;