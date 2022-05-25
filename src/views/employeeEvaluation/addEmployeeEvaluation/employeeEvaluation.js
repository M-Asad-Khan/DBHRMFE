import React, { useState, useEffect } from "react";

import {
  updateNewEmployeeEvaluationAction,
  updateEmployeesEvaluationAction,
  updateIsAddEmployeeEvaluationClickedAction,
  updateIsEditEmployeeEvaluationClickedAction,
} from "../../../redux/EmployeeEvaluation/employeeEvaluation.action";
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from "../../../API/EmployeeApi";
import { teamRequests } from "../../../API/TeamApi";
import { employeeEvaluationRequests } from "src/API/employeeEvaluationApi";
import { IoArrowBackSharp } from "react-icons/io5";
import Select from "react-select";
import { CButton } from "@coreui/react";
import { toast } from "react-toastify";

// import backIcon from '/src/assets/back-icon.png'

const employeeEvaluation = ({}) => {
  const empDisciplineOptions = [
    { value: "Excellent", label: "Excellent", field: "employeeDiscipline" },
    { value: "Good", label: "Good", field: "employeeDiscipline" },
    { value: "Fair", label: "Fair", field: "employeeDiscipline" },
    { value: "Poor", label: "Poor", field: "employeeDiscipline" },
  ];
  const supervisorRecOptions = [
    { value: "I recommend promotion", label: "I recommend promotion", field: "supervisorRecommendations" },
    { value: "I recommend a raise", label: "I recommend a raise", field: "supervisorRecommendations" },
    { value: "Other", label: "Other", field: "supervisorRecommendations" },
    
  ];

  const empWorkQualityOptions = [
    { value: "Excellent", label: "Excellent", field: "workQuality" },
    { value: "Good", label: "Good", field: "workQuality" },
    { value: "Above Average", label: "Above Average", field: "workQuality" },
    { value: "Below Average", label: "Below Average", field: "workQuality" },
  ];
  const empWorkConsistencyOptions = [
    { value: "Excellent", label: "Excellent", field: "workConsistency" },
    { value: "Good", label: "Good", field: "workConsistency" },
    { value: "Fair", label: "Fair", field: "workConsistency" },
    { value: "Poor", label: "Poor", field: "workConsistency" },
  ];
  const empDecisionAbilityOptions = [
    { value: "Excellent", label: "Excellent", field: "decisionAbility" },
    { value: "Good", label: "Good", field: "decisionAbility" },
    { value: "Fair", label: "Fair", field: "decisionAbility" },
    { value: "Poor", label: "Poor", field: "decisonAbility" },
  ];
  const empKnowledgeOptions = [
    { value: "Excellent", label: "Excellent", field: "knowledge" },
    { value: "Good", label: "Good", field: "knowledge" },
    { value: "Fair", label: "Fair", field: "knowledge" },
    { value: "Poor", label: "Poor", field: "knowledge" },
  ];

  const dispatch = useDispatch();
  const hrState = useSelector((state) => state.employeesEvaluation);
  const employee = hrState?.newEvaluation?.employeeName;
  const [tempEmployee, setTempEmployee] = useState({value:employee?.name,label:employee?.name});
  const [employees, setEmployees] = useState([]);
  const team = hrState?.newEvaluation?.teamName;
  const [tempTeam, setTempTeam] = useState({value:team?.name,label:team?.name});
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    handleGetEmployeesApi();
    handleGetTeamsApi();
  }, []);
  const handleGetEmployeesApi = async () => {
    try {
      const res = await employeeRequests.getEmployeesApi();
           
      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
         
          return { ...x, value: x.name, label: x.name };
        });
       // console.log("tempArr", tempArr);
        setEmployees(tempArr);
      }
    } catch (err) {
      //console.log(err);
    }
  };

  const handleGetTeamsApi = async () => {
    try {
      const res = await teamRequests.getTeamsApi();
           
      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
         
          return { ...x, value: x.teamName, label: x.teamName };
        });
       // console.log("tempArr", tempArr);
        setTeams(tempArr);
      }
    } catch (err) {
      //console.log(err);
    }
  };
  function handleChange(evt) {
    const value = evt?.target?.value;
    dispatch(
      updateNewEmployeeEvaluationAction({
        ...hrState?.newEvaluation,
        [evt?.target?.name]: value,
      })
    );
  }
  const handleCancel = () => {
    dispatch(updateNewEmployeeEvaluationAction({}));
    dispatch(updateIsAddEmployeeEvaluationClickedAction(false));
    dispatch(updateIsEditEmployeeEvaluationClickedAction(false));
  };
  const addAndUpdateEmployeeEvaluation = async () => {
    if (hrState.isEditEmployeeEvaluationClicked === true) {
      try {
        const res =
          await employeeEvaluationRequests.updateEmployeeEvaluationApi(
            hrState.newEvaluation
          );
        console.log("updateEmployeeEvaluation Response", res);
        if (res.error === false) {
          toast.success("Employee Evaluation Updated !");
          let temp = hrState.employeesEvaluation.filter(
            (item) => item.id != res.data.id
          );
          dispatch(updateEmployeesEvaluationAction([...temp, res.data]));
          dispatch(updateIsAddEmployeeEvaluationClickedAction(false));
          dispatch(updateIsEditEmployeeEvaluationClickedAction(false));
        }
      } catch (e) {
        toast.error("error !");
      }
    } else {
      try {
        const res = await employeeEvaluationRequests.addEmployeeEvaluationApi(
          hrState.newEvaluation
        );
        console.log("addEmployeeEvaluationApi Response", res);

        if (res.error === false) {
          toast.success("Employee Evaluation Added !");

          dispatch(
            updateEmployeesEvaluationAction([
              ...hrState.employeesEvaluation,
              res.data,
            ])
          );
          dispatch(updateIsAddEmployeeEvaluationClickedAction(false));
          dispatch(updateIsEditEmployeeEvaluationClickedAction(false));
        }
      } catch (e) {
        toast.error("error");
      }
    }
  };

  const handleReactSelectChange = (param) => {
      debugger;
    dispatch(
      updateNewEmployeeEvaluationAction({
        ...hrState?.newEvaluation,
        [param.field]: param.value,
      })
    );
  };
  const handleEmployeeSelectChange = (param) => {

    dispatch(
        updateNewEmployeeEvaluationAction({
        ...hrState?.newEvaluation,
        employeeId: param.id,
      })
    );
    setTempEmployee(param)
   
  };
  const handleTeamSelectChange = (param) => {

    dispatch(
        updateNewEmployeeEvaluationAction({
        ...hrState?.newEvaluation,
        teamId: param.id,
      })
    );
    setTempTeam(param)
   
  };
  console.log("newEvaluation",hrState?.newEvaluation)

  return (
    <>
      <div className="container-fluid px-1 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="card">
            <div className="form-card">
              <button
                className="btn btn-outline-primary mb-3"
                onClick={handleCancel}
              >
                <IoArrowBackSharp />
              </button>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label">
                    Name<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={tempEmployee}
                    
                    
                    options={employees}
                   onChange={handleEmployeeSelectChange}
                  ></Select>
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Team Name<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    type="text"
                    id="teamId"
                    name="teamId"
                    value={tempTeam}
                    
                    
                    options={teams}
                   onChange={handleTeamSelectChange}
                  ></Select>
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Employee Discipline<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    
                    id="employeeDiscipline"
                    name="employeeDiscipline"
                    options={empDisciplineOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Employee's work Quality{" "}
                    <span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    
                    id="quality"
                    name="quality"
                    options={empWorkQualityOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Work Consistency<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                   
                    id="workConsistency"
                    name="workConsistency"
                    options={empWorkConsistencyOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Decision Making Ability
                    <span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                   
                    id="descision"
                    name="descision"
                    options={empDecisionAbilityOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Job Knowledge and Proficiency
                    <span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                   
                    id="knowledge"
                    name="knowledge"
                    options={empKnowledgeOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  {" "}
                  <label className="form-control-label px-3">
                    Productivity<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                     
                    id="productivity"
                    name="productivity"
                    options={empDecisionAbilityOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Involvement of Worker in Team Effort
                    <span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                     /* value={{
                      label: hrState?.newEvaluation
                        ?.involvementOfWorkerInTeamEffort
                        ? hrState?.newEvaluation?.involvementOfWorkerInTeamEffort
                            ?.charAt(0)
                            ?.toUpperCase() +
                            hrState?.newEvaluation?.involvementOfWorkerInTeamEffort?.slice(1)
                        : null,
                      value: hrState?.newEvaluation?.involvementOfWorkerInTeamEffort,
                    }}  */
                    id="worker"
                    name="worker"
                    options={empDecisionAbilityOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Accomplishment of job deadline
                    <span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    
                    id="deadline"
                    name="deadline"
                    options={empDecisionAbilityOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Punctuality<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    
                    id="punctuality"
                    name="punctuality"
                    options={empDecisionAbilityOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Receptiveness to changing work environment
                    <span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    
                    id="work"
                    name="work"
                    options={empDecisionAbilityOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Employee Observation<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    value={hrState?.newEvaluation?.employeeObservation}
                    onChange={handleChange}
                    type="text"
                    id="observation"
                    name="observation"
                    placeholder="Enter short answer"
                  />{" "}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Employee's Strength<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    value={hrState?.newEvaluation?.employeeStrength}
                    onChange={handleChange}
                    type="text"
                    id="strength"
                    name="strength"
                    placeholder="Enter answer"
                  />
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Areas that need improvement<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    value={hrState?.newEvaluation?.areasThatNeedsImprovement}
                    onChange={handleChange}
                    type="text"
                    id="areasThatNeedsImprovement"
                    name="areasThatNeedsImprovement"
                    placeholder="Enter answer"
                  />{" "}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Supervisor Recommendations<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    
                    id="supervisorRecommendations"
                    name="supervisorRecommendations"
                    options={supervisorRecOptions}
                    onChange={handleReactSelectChange}
                  ></Select>
                  
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Based on the above text, Your suggestions please <span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    value={hrState?.newEvaluation?.suggestions}
                    onChange={handleChange}
                    type="text"
                    id="suggestions"
                    name="suggestions"
                    placeholder="Enter answer"
                  />{" "}
                </div>
                </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 ">
                  <button
                    className="btn-block btn-primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="form-group col-sm-6 ">
                  <CButton
                    className="btn-block btn-primary"
                    onClick={() => addAndUpdateEmployeeEvaluation()}
                  >
                    {hrState?.isEditEmployeeEvaluationClicked
                      ? "Update Employee Evaluation"
                      : "Add Employee Evaluation"}
                  </CButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default employeeEvaluation;
