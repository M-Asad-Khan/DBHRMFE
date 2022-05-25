import axios from "axios";

class employeeEvaluationApi {
  addEmployeeEvaluationApi = async (newEvaluation) => {
    debugger
    console.log(newEvaluation);

    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employeeEvaluation`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        employeeId:newEvaluation.employeeId,
        teamId:newEvaluation.teamId,
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
        areasThatNeedsImprovement:newEvaluation.areasThatNeedsImprovement,
        supervisorRecommendations:newEvaluation.supervisorRecommendations,
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

  deleteEmployeeEvaluationApi = async (id) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employeeEvaluation/${id}`,
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

  getEmployeesEvaluationApi = async () => {
    debugger;
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employeeEvaluation`,
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

  updateEmployeeEvaluationApi = async (newEvaluation) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/employeeEvaluation/${newEvaluation.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        employeeId:newEvaluation.employeeId,
        teamId:newEvaluation.teamId,
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
        areasThatNeedsImprovement:newEvaluation.areasThatNeedsImprovement,
        supervisorRecommendations:newEvaluation.supervisorRecommendations,
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
