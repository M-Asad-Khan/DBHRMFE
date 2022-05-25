import React, { useState, useEffect } from "react";

import {
  updateNewEmployeeEvaluationAction,
  updateIsAddEmployeeEvaluationClickedAction,
  updateEmployeesEvaluationAction,
  updateIsEditEmployeeEvaluationClickedAction,
  updateEmployeesEvaluationDataTableAction,
  updateIsViewEmpEvaluationClickedAction,
} from "../../redux/EmployeeEvaluation/employeeEvaluation.action";
import { useSelector, useDispatch } from "react-redux";

import ViewEmployeeEvaluation from "./viewEmployeeEvaluation/viewEmployeeEvaluation";

import AddEmployeeEvaluation from "./addEmployeeEvaluation/employeeEvaluation";
import { employeeEvaluationRequests } from "src/API/employeeEvaluationApi";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";

function employeesEvaluation() {
       
  var action = "";

  const evaluationState = useSelector((state) => state.employeeEvaluation);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});

  useEffect(() => {
    handleGetEmployeeEvaluationApi();
  }, []);
  useEffect(() => {
      
    if (
      evaluationState?.isAddEmployeeEvaluationClicked === false ||
      evaluationState?.isEditEmployeeEvaluationClicked === false
    ) {
          
      handleGetEmployeeEvaluationApi();
    }
  }, [evaluationState.isAddEmployeeEvaluationClicked, evaluationState.isEditEmployeeEvaluationClicked]);

  useEffect(() => {
         
    setColumnsAndRows(evaluationState.employeesEvaluationDataTable);
  }, [evaluationState.employeesEvaluationDataTable]);
  function setSelectedRow(rowData) {
         
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "delete":
               
          handleDelete(rowData);
          break;
        case "view":
          handleView(rowData);
          break;
        case "edit":
          handleEdit(rowData);
          break;

        default:
          break;
      }
    }
    console.log("rowData", rowData);
    console.log("action", action);
  }

  const handleDelete = async (employeeEvaluation) => {
         
    try {
      const res = await employeeEvaluationRequests.deleteEmployeeEvaluationApi(employeeEvaluation.id);
      if (res.error === false) {
        handleGetEmployeeEvaluationApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (employeeEvaluation) => {
         
    dispatch(updateNewEmployeeEvaluationAction(employeeEvaluation));
    dispatch(updateIsEditEmployeeEvaluationClickedAction(true));
  };
  const handleView =async (employeeEvaluation) => {
         
    
				dispatch(updateNewEmployeeEvaluationAction(employeeEvaluation));
				dispatch(updateIsViewEmpEvaluationClickedAction(true));
				     
      
  };
  const handleGetEmployeeEvaluationApi = async () => {
    try {
      const res = await employeeEvaluationRequests.getEmployeesEvaluationApi();
           
      if (res.error === false) {
        dispatch(updateEmployeesEvaluationAction(res.data));
        var tempArr = [];
        res.data.map((x) => {
          tempArr.push({
						...x,

            action: (
              <>
                <FiEye
                  onClick={() => (action = "view")}
                  style={{ color: "blue", cursor: "pointer" }}
                />
                <FiEdit
                  onClick={() => (action = "edit")}
                  style={{
                    color: "orange",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />
                <FiTrash
                  // onClick={() => (action = "delete")}
                  style={{
                    color: "red",
                    marginLeft: "20px",
                    cursor: "not-allowed",
                  }}
                />
              </>
            ),
            clickEvent: setSelectedRow,
            employeeName:x?.employee.name,
            teamLeadName: x?.team.teamLeadName.name,
          });
        });
             
        console.log("eventarr", tempArr);
        var tempObj = { ...evaluationState.employeesEvaluationDataTable, rows: tempArr };
        dispatch(updateEmployeesEvaluationDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

	function handleAddEmployeeEvaluation() {
		// console.log('true ho gya...!')
		     
		
		dispatch(updateIsAddEmployeeEvaluationClickedAction(true));
  }
  console.log("evaluationState: index.js", evaluationState);
  return (
    <>
      {evaluationState.isViewEmpEvaluationClicked ? (
        <ViewEmployeeEvaluation />
      ) : evaluationState.isAddEmployeeEvaluationClicked === true ||
        evaluationState.isEditEmployeeEvaluationClicked === true ? (
        <AddEmployeeEvaluation />
      ) : (
        <>
          <div className="card mt-0">
            <button
              type="button"
              className="btn btn-outline-primary col-sm-2"
              onClick={()=>handleAddEmployeeEvaluation()}
            >
              Add Employee Evaluation
            </button>
            <MDBDataTable
              className="mdbDataTableDesign"
              infoLabel={["Showing", "to", "of", "evaluations"]}
              bordered
              displayEntries={false}
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={columnsAndRows}
            />
          </div>
        </>
      )}
    </>
  );
}

export default employeesEvaluation;
