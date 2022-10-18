import React, { useState, useEffect } from "react";

import {
  updateNewEmployeeAction,
  updateIsAddEmployeeClickedAction,
  updateEmployeesAction,
  updateIsEditEmployeeClickedAction,
  updateEmployeesDataTableAction,
  updateIsViewEmpClickedAction
} from "../../redux/Employees/employees.actions";
import { useSelector, useDispatch } from "react-redux";

import ViewEmployee from "./ViewEmployee/ViewEmployee";

import AddEmployee from "./addEmployee/AddEmployee";
import { employeeRequests } from "src/API/EmployeeApi";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import { MDBDataTable } from "mdbreact";

function employees() {
  var action = "";

  const state = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [columnsAndRows, setColumnsAndRows] = useState({});
  const currentUser = useSelector((state) => state.login.currentUser);
  const [isAdmin,setIsAdmin] = useState()

  useEffect(() => {
    handleGetEmployeeApi();
  }, []);
  useEffect(() => {
    if (
      state.isAddEmployeeClicked === false ||
      state.isEditEmployeeClicked === false
    ) {
      handleGetEmployeeApi();
    }
  }, [state.isAddEmployeeClicked, state.isEditEmployeeClicked]);

  useEffect(() => {
    setColumnsAndRows(state.employeesDataTable);
  }, [state.employeesDataTable]);
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

  const handleDelete = async (employee) => {
    try {
      const res = await employeeRequests.deleteEmployeeApi(employee.id);
      if (res.error === false) {
        handleGetEmployeeApi();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (employee) => {
    dispatch(updateNewEmployeeAction(employee));
    dispatch(updateIsEditEmployeeClickedAction(true));
  };
  const handleView = async (employee) => {
    try {
      const res = await employeeRequests.getEmployeeWorkHistory(employee.id);
      if (res.error === false) {
        var tempObj = { employee: employee, workHistory: res.data };
        dispatch(updateNewEmployeeAction(tempObj));
        dispatch(updateIsViewEmpClickedAction(true));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetEmployeeApi = async () => {
    try {
      var temp;
      let res;
      if (
        currentUser.userPermission.some(
          (x) => x.role.name === "Admin" || x.role.name === "HR"
        )
      ) {
        temp = false;
        setIsAdmin(true)
      } else {
        temp = true;
        setIsAdmin(false)
      }
      if (temp) {
        res = await employeeRequests.getEmployeeApi(currentUser?.Profile?.id);

        if (res.error === false) {
          dispatch(updateEmployeesAction(res.data));
          var tempArr = [];
          tempArr.push({
            ...res.data,
            appointmentLetterStatus: res.data.appointmentLetterStatus
              ? "true"
              : "false",
            agreementSignStatus: res.data.agreementSignStatus
              ? "true"
              : "false",
            action: (
              <>
                <FiEye
                  onClick={() => (action = "view")}
                  style={{ color: "blue", cursor: "pointer" }}
                />
                {/*   <FiEdit
                      onClick={() => (action = "edit")}
                      style={{
                        color: "orange",
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                    /> */}
                {/* <FiTrash
                      // onClick={() => (action = "delete")}
                      style={{
                        color: "red",
                        marginLeft: "20px",
                        cursor: "not-allowed",
                      }}
                    /> */}
              </>
            ),
            clickEvent: setSelectedRow
          });
          var tempObj = { ...state.employeesDataTable, rows: tempArr };
          dispatch(updateEmployeesDataTableAction(tempObj));
        }
      } else {
        res = await employeeRequests.getEmployeesApi();
        if (res.error === false) {
          dispatch(updateEmployeesAction(res.data));
          var tempArr = [];
          res.data.map((x) => {
            tempArr.push({
              ...x,
              appointmentLetterStatus: x.appointmentLetterStatus
                ? "true"
                : "false",
              agreementSignStatus: x.agreementSignStatus ? "true" : "false",
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
                      cursor: "pointer"
                    }}
                  />
                  <FiTrash
                    // onClick={() => (action = "delete")}
                    style={{
                      color: "red",
                      marginLeft: "20px",
                      cursor: "not-allowed"
                    }}
                  />
                </>
              ),
              clickEvent: setSelectedRow
            });
          });

          console.log("eventarr", tempArr);
          var tempObj = { ...state.employeesDataTable, rows: tempArr };
          dispatch(updateEmployeesDataTableAction(tempObj));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleAddEmployee() {
    // console.log('true ho gya...!')

    dispatch(
      updateNewEmployeeAction({
        employee_No: "emp-" + (state.employees.length + 1)
      })
    );
    dispatch(updateIsAddEmployeeClickedAction(true));
  }
  console.log("state:", state);
  return (
    <>
      {state.isViewEmpClicked ? (
        <ViewEmployee />
      ) : state.isAddEmployeeClicked === true ||
        state.isEditEmployeeClicked === true ? (
        <AddEmployee />
      ) : (
        <>
          <div className="card mt-0">
            { isAdmin && <button
              type="button"
              className="btn btn-outline-primary col-sm-2"
              onClick={() => handleAddEmployee()}
            >
              Add Employee
            </button>}
            <MDBDataTable
              className="mdbDataTableDesign"
              infoLabel={["Showing", "to", "of", "employees"]}
              bordered
              displayEntries={false}
              hover
              entriesOptions={[5, 20, 25]}
              entries={100}
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
