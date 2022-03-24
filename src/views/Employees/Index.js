import React, { useState, useEffect } from "react";
import AddEmployee from "./addEmployee/AddEmployee";
import {
  updateNewEmployeeAction,
  updateIsAddEmployeeClickedAction,
  updateEmployeesAction,
  updateIsEditEmployeeClickedAction,
} from "../../redux/Employees/employees.actions";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeesApi } from "src/API/GetEmployeesApi";
import { deleteEmployeeApi } from "src/API/DeleteEmployeeApi";
// import CIcon from '@coreui/icons-react'
// import {
// 	cilUpdate
// } from '@coreui/icons'

function employees(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.employees);

  useEffect(() => {
    handleGetEmployeeApi();
  }, []);

  function handleAddEmployee() {
    dispatch(updateIsAddEmployeeClickedAction(true));
  }

  const handleGetEmployeeApi = async () => {
    try {
      const res = await getEmployeesApi();
      if (res.error === false) {
        dispatch(updateEmployeesAction(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (employee) => {
    debugger;
    try {
      const res = await deleteEmployeeApi(employee.id);
      if (res.error === false) {
        debugger;
        dispatch(
          updateEmployeesAction(
            state.employees.filter((item) => item.id != employee.id)
          )
        );
        debugger;
        console.log(employees);
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
  const handleView = () => {
    debugger;
  };
  console.log("state:", state);
  return (
    <>
      {state.isAddEmployeeCicked === true ||
      state.isEditEmployeeClicked === true ? (
        <AddEmployee />
      ) : (
        <>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddEmployee}
          >
            Add Employee
          </button>
          <br />
          <br />
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col"> #</th>
                <th scope="col"> Name</th>
                <th scope="col"> Email</th>
                <th scope="col"> Mobile</th>
                <th scope="col"> Action</th>
              </tr>
            </thead>
            <tbody>
              {state.employees &&
                state.employees.map((employee, i) => {
                  return (
                    <tr key={employee.id}>
                      <th scope="row">{i+1}</th>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>
                        {/* <CIcon icon={cilUpdate} /> */}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleEdit(employee);
                          }}
                          className="btn btn-outline-primary"
                        >
                          Edit
                        </span>
                        <span
                          className="btn btn-outline-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleDelete(employee);
                          }}
                        >
                          delete
                        </span>
                        <span
                          className="btn btn-outline-primary"
                          onClick={handleView}
                        >
                          view
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default employees;
