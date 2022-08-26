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

export const updateNewEmployeeEvaluationAction = (params) => {
    return {
        type: updateNewEmployeeEvaluation,
        payload: params,
    };
};
export const updateIsAddEmployeeEvaluationClickedAction = (params) => {

    return {
        type: updateIsAddEmployeeEvaluationClicked,
        payload: params,
    };
};

export const updateEmployeesEvaluationAction = (params) => {
    return {
        type: updateEmployeesEvaluation,
        payload: params,
    };
};
export const updateIsEditEmployeeEvaluationClickedAction = (params) => {
    return {
        type: updateIsEditEmployeeEvaluationClicked,
        payload: params,
    };
};
export const updateEmployeesEvaluationDataTableAction = (params) => {
    return {
        type: updateEmployeesEvaluationDataTable,
        payload: params,
    };
};
export const updateIsViewEmpEvaluationClickedAction = (params) => {
    return {
        type: updateIsViewEmpEvaluationClicked,
        payload: params,
    };
};
export const updateIsAddMemberDetailsClickedAction = (params) => {

    return {
        type: updateIsAddMemberDetailsClicked,
        payload: params,
    };
};
export const updateIsAddTeamDetailsClickedAction = (params) => {

    return {
        type: updateIsAddTeamDetailsClicked,
        payload: params,
    };
};