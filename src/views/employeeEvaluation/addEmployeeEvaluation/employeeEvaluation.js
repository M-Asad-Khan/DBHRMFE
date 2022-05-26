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



const employeeEvaluation = ({}) => {
  const Options = [
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


  const dispatch = useDispatch();
  const evaluationState = useSelector((state) => state.employeeEvaluation);
  const employee = evaluationState?.newEvaluation?.employeeName;
  const [tempEmployee, setTempEmployee] = useState({value:employee?.name,label:employee?.name});
  const [employees, setEmployees] = useState();
  const team = evaluationState?.newEvaluation?.teamName;
  const [tempTeam, setTempTeam] = useState({value:team?.name,label:team?.name});
  const memberdata=evaluationState?.isAddMemberDetails;
  const teamdata=evaluationState?.isAddTeamDetails;

  const [teams, setTeams] = useState();
  console.log("rhr", evaluationState)
  console.log("value", memberdata);

     useEffect(() => {
      handleGetEmployeesApi();
    }, [teamdata,memberdata]);

    const handleGetEmployeesApi = async () => {
     
      
      debugger
       
         var tempArr1 = memberdata && memberdata?.map((x) => {
         
            return { ...x, value: x.name, label: x.name };
          });
         // console.log("tempArr", tempArr);
          setEmployees(tempArr1);
          var tempArr = teamdata && teamdata?.map((x) => {
         
            return { ...x, value: x.teamName, label: x.teamName };
          });
          // console.log("tempArr", tempArr);
           setTeams(tempArr);
       
    
    };


  function handleChange(evt,label) {
    debugger
    console.log(evt)
    dispatch(
      updateNewEmployeeEvaluationAction({
        ...evaluationState?.newEvaluation,
        [label]: evt.value,
      })
    );
  }

  function handleInputFields(evt) {
    debugger
    console.log(evt)
    dispatch(
      updateNewEmployeeEvaluationAction({
        ...evaluationState?.newEvaluation,
        [evt.target.name]: evt.target.value,
      })
    );
  }
  const handleCancel = () => {
    dispatch(updateNewEmployeeEvaluationAction({}));
    dispatch(updateIsAddEmployeeEvaluationClickedAction(false));
    dispatch(updateIsEditEmployeeEvaluationClickedAction(false));
  };
   const addAndUpdateEmployeeEvaluation = async () => {
     if (evaluationState?.isEditEmployeeEvaluationClicked === true) {
       try {
         const res =
           await employeeEvaluationRequests?.updateEmployeeEvaluationApi(
             evaluationState?.newEvaluation
           );
         console.log("updateEmployeeEvaluation Response", res);
         if (res.error === false) {
           toast.success("Employee Evaluation Updated !");
           let temp = evaluationState?.employeesEvaluation?.filter(
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
         const res = await employeeEvaluationRequests?.addEmployeeEvaluationApi(
           evaluationState?.newEvaluation
         );
         console.log("addEmployeeEvaluationApi Response", res);

         if (res.error === false) {
           toast.success("Employee Evaluation Added !");

           dispatch(
             updateEmployeesEvaluationAction([
               ...evaluationState?.employeesEvaluation,
               res?.data,
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

   const handleReactSelectChange = (evt) => {
       debugger;
       const value = evt.target ? evt.target.value : evt.value;
       const name = evt.target ? evt.target.name : evt.field;
       dispatch(
         updateNewEmployeeEvaluationAction({
           ...evaluationState?.newEvaluation,
           [name]: value,
         })
       );


   };
  const handleEmployeeSelectChange = (param) => {
    debugger

    dispatch(
        updateNewEmployeeEvaluationAction({
        ...evaluationState.newEvaluation,
        employeeId: param.id,
      })
    );
    setTempEmployee(param)
   
  };
  const handleTeamSelectChange = (param) => {
    debugger

    dispatch(
        updateNewEmployeeEvaluationAction({
        ...evaluationState?.newEvaluation,
        teamId: param.id,
      })
    );
    setTempTeam(param)
   
  };
  console.log("newEvaluation: asd",evaluationState.newEvaluation)

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
                    options={Options}
                    onChange={(event)=>handleChange(event,'employeeDiscipline')}
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
                    onChange={(event)=>handleChange(event,'employeeWorkQuality')}
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
                    options={Options}
                    onChange={(event)=>handleChange(event,'workConsistency')}
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
                    options={Options}
                    onChange={(event)=>handleChange(event,'decisionMakingAbility')}
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
                    options={Options}
                    onChange={(event)=>handleChange(event,'jobKnowledgeAndProficiency')}
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
                    options={Options}
                    onChange={(event)=>handleChange(event,'productivity')}
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
                     
                    id="involvementOfWorkerInTeamEffort"
                    name="involvementOfWorkerInTeamEffort"
                    options={Options}
                    onChange={(event)=>handleChange(event,'involvementOfWorkerInTeamEffort')}
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
                    options={Options}
                    onChange={(event)=>handleChange(event,'accomplishmentsOfJobDeadlines')}
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
                    options={Options}
                    onChange={(event)=>handleChange(event,'punctuality')}
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
                    options={Options}
                    onChange={(event)=>handleChange(event,'receptivenessToChangingWorkEnvironment')}
                  ></Select>
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Employee Observation<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    value={evaluationState?.newEvaluation?.employeeObservation}
                    onChange={handleInputFields}
                    type="text"
                    id="observation"
                    name="employeeObservation"
                    placeholder="Enter short answer"
                  />{" "}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Employee's Strength<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    value={evaluationState?.newEvaluation?.employeeStrength}
                    onChange={handleInputFields}
                    type="text"
                    id="strength"
                    name="employeeStrength"
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
                    value={evaluationState?.newEvaluation?.areasThatNeedsImprovement}
                    onChange={handleInputFields}
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
                    onChange={(event)=>handleChange(event,'supervisorRecommendations')}
                  ></Select>
                  
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Based on the above text, Your suggestions please <span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    value={evaluationState?.newEvaluation?.suggestions}
                    onChange={handleInputFields}
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
                    onClick={() => addAndUpdateEmployeeEvaluation() 
                     }
                    
                    
                  >
                    {evaluationState?.isEditEmployeeEvaluationClicked
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
