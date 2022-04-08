import React, { useState, useEffect } from "react";

import {
  updateNewEmployeeAction,
  updateIsAddEmployeeClickedAction,
  updateEmployeesAction,
  updateIsEditEmployeeClickedAction,
  updateEmployeesDataTableAction,
  updateIsViewClickedAction,
} from "../../redux/Employees/employees.actions";
import { useSelector, useDispatch } from "react-redux";

import ViewEmployee from "./ViewEmployee/ViewEmployee";

import AddEmployee from "./addEmployee/AddEmployee";
import { getEmployeesApi } from "src/API/GetEmployeesApi";
import { deleteEmployeeApi } from "src/API/DeleteEmployeeApi";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";

function employees() {
  debugger;
  var action = "";

  const state = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});

  useEffect(() => {
    handleGetEmployeeApi();
  }, []);
  useEffect(() => {
    if (
      state.isAddEmployeeClicked === false ||
      state.isEditEmployeeClicked === false
    ) {
      debugger;
      handleGetEmployeeApi();
    }
  }, [state.isAddEmployeeClicked, state.isEditEmployeeClicked]);

  useEffect(() => {
    debugger;
    setColumnsAndRows(state.employeesDataTable);
  }, [state.employeesDataTable]);
  function setSelectedRow(rowData) {
    debugger;
    if (action == "") {
      return;
    } else {
      switch (action) {
        case "delete":
          debugger;
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

  const handleDelete = async (employee) => {
    debugger;
    try {
      const res = await deleteEmployeeApi(employee.id);
      if (res.error === false) {
        handleGetEmployeeApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (employee) => {
    debugger;
    dispatch(updateNewEmployeeAction(employee));
    dispatch(updateIsEditEmployeeClickedAction(true));
  };
  const handleView = (employee) => {
    debugger;
    dispatch(updateIsViewClickedAction(true));
    dispatch(updateNewEmployeeAction(employee));
  };
  const handleGetEmployeeApi = async () => {
    try {
      const res = await getEmployeesApi();
      debugger;
      if (res.error === false) {
        dispatch(updateEmployeesAction(res.data));
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
                  onClick={() => (action = "delete")}
                  style={{
                    color: "red",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />
              </>
            ),
            clickEvent: setSelectedRow,
          });
        });
        debugger;
        console.log("eventarr", tempArr);
        var tempObj = { ...state.employeesDataTable, rows: tempArr };
        dispatch(updateEmployeesDataTableAction(tempObj));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleAddEmployee() {
    dispatch(updateIsAddEmployeeClickedAction(true));
  }
  console.log("state:", state);
  return (
    <>
      {state.isViewClicked ? (
        <ViewEmployee />
      ) : state.isAddEmployeeCicked === true ||
        state.isEditEmployeeClicked === true ? (
        <AddEmployee />
      ) : (
        <>
          <div className="card mt-0">
            <button
              type="button"
              className="btn btn-outline-primary col-sm-2"
              onClick={handleAddEmployee}
            >
              Add Employee
            </button>
            <MDBDataTable
              className="mdbDataTableDesign"
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

export default employees;
