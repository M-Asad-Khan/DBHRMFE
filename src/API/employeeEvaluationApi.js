import axios from "axios";

class employeeEvaluationApi {
    addEmployeeEvaluationApi = async(newEvaluation) => {
        debugger
        console.log(newEvaluation);

        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeEvaluation`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    employeeId: newEvaluation.employeeId,
                    teamId: newEvaluation.teamId,
                    dateOfEvaluation: newEvaluation.dateOfEvaluation,
                    employeeDiscipline: newEvaluation.employeeDiscipline,
                    employeeWorkQuality: newEvaluation.employeeWorkQuality,
                    workConsistency: newEvaluation.workConsistency,
                    decisionMakingAbility: newEvaluation.decisionMakingAbility,
                    jobKnowledgeAndProficiency: newEvaluation.jobKnowledgeAndProficiency,
                    productivity: newEvaluation.productivity,
                    involvementOfWorkerInTeamEffort: newEvaluation.involvementOfWorkerInTeamEffort,
                    accomplishmentsOfJobDeadlines: newEvaluation.accomplishmentsOfJobDeadlines,
                    punctuality: newEvaluation.punctuality,
                    receptivenessToChangingWorkEnvironment: newEvaluation.receptivenessToChangingWorkEnvironment,
                    employeeObservation: newEvaluation.employeeObservation,
                    employeeStrength: newEvaluation.employeeStrength,
                    areasThatNeedsImprovement: newEvaluation.areasThatNeedsImprovement,
                    supervisorRecommendations: newEvaluation.supervisorRecommendations,
                    suggestions: newEvaluation.suggestions,
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                const error = JSON.stringify(err);
                console.log("Employee Evaluation Error", error);
                return {
                    error: true,
                    data: err,
                };
            });
    };

    deleteEmployeeEvaluationApi = async(id) => {
        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeEvaluation/${id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };

    getEmployeesEvaluationApi = async() => {

        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeEvaluation`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };
    getEmployeesRecordApi = async(id) => {

        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeEvaluation/${id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };

    updateEmployeeEvaluationApi = async(newEvaluation) => {
        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeEvaluation/${newEvaluation.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    employeeId: newEvaluation.employeeId,
                    teamId: newEvaluation.teamId,
                    dateOfEvaluation: newEvaluation.dateOfEvaluation,
                    employeeDiscipline: newEvaluation.employeeDiscipline,
                    employeeWorkQuality: newEvaluation.employeeWorkQuality,
                    workConsistency: newEvaluation.workConsistency,
                    decisionMakingAbility: newEvaluation.decisionMakingAbility,
                    jobKnowledgeAndProficiency: newEvaluation.jobKnowledgeAndProficiency,
                    productivity: newEvaluation.productivity,
                    involvementOfWorkerInTeamEffort: newEvaluation.involvementOfWorkerInTeamEffort,
                    accomplishmentsOfJobDeadlines: newEvaluation.accomplishmentsOfJobDeadlines,
                    punctuality: newEvaluation.punctuality,
                    receptivenessToChangingWorkEnvironment: newEvaluation.receptivenessToChangingWorkEnvironment,
                    employeeObservation: newEvaluation.employeeObservation,
                    employeeStrength: newEvaluation.employeeStrength,
                    areasThatNeedsImprovement: newEvaluation.areasThatNeedsImprovement,
                    supervisorRecommendations: newEvaluation.supervisorRecommendations,
                    suggestions: newEvaluation.suggestions,
                },
            })
            .then((result) => {
                return {
                    error: false,
                    data: result.data,
                };
            })
            .catch((err) => {
                return {
                    error: true,
                    data: err,
                };
            });
    };
}
export let employeeEvaluationRequests = new employeeEvaluationApi();