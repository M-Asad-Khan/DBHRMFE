import React, { useState } from "react";
import "./addemployee.css";
import {
  updateNewEmployeeAction,
  updateEmployeesAction,
  updateIsAddEmployeeClickedAction,
  updateIsEditEmployeeClickedAction,
} from "../../../redux/Employees/employees.actions";
import { useSelector, useDispatch } from "react-redux";
import { addEmployeeApi } from "src/API/AddEmployeeApi";
import { updateEmployeeApi } from "src/API/UpdateEmployeeApi";

// import backIcon from '/src/assets/back-icon.png'

const AddEmployee = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.employees);

  function handleChange(evt) {
    debugger;
    const value = evt.target.value;
    dispatch(
      updateNewEmployeeAction({
        ...state.newEmployee,
        [evt.target.name]: value,
      })
    );
  }
  const handleCancle = () => {
    dispatch(updateNewEmployeeAction({}));
    dispatch(updateIsAddEmployeeClickedAction(false));
    dispatch(updateIsEditEmployeeClickedAction(false));
  };
  const addAndUpdateEmployee = async () => {
    if (state.isEditEmployeeClicked === true) {
      try {
        debugger;
        const res = await updateEmployeeApi(state.newEmployee);
        console.log("updateEmployee Response", res);

        debugger;
        if (res.error === false) {
          debugger;
					alert("Employee Updated");
					let temp=state.employees.filter(item=>item.id!=res.data.id)
					dispatch(updateEmployeesAction([...temp, res.data]	));
          dispatch(updateIsAddEmployeeClickedAction(false));
          dispatch(updateIsEditEmployeeClickedAction(false));
        }
      } catch (e) {
        debugger;
      }
    } else {
      try {
        debugger;
        const res = await addEmployeeApi(state.newEmployee);
        console.log("addEmployeeApi Response", res);

        debugger;
        if (res.error === false) {
          alert("Employee Created");
          dispatch(updateEmployeesAction([...state.employees, res.data]));
          dispatch(updateIsAddEmployeeClickedAction(false));
        }
      } catch (e) {
        debugger;
      }
    }
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        {/* <img src={require('src/assets/images/avatars/')} /> */}
        {/* <img src={ backIcon}/> */}

        <div className="card">
          {state.newEmployee.id}
          <div className="form-card">
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Name<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  value={state.newEmployee.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Age<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  value={state.newEmployee.age}
                  onChange={handleChange}
                  type="text"
                  id="age"
                  name="age"
                  placeholder="Enter your age"
                />{" "}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Address<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.address}
                  onChange={handleChange}
                  type="text"
                  id="address"
                  name="address"
                  placeholder=""
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Date of Birth<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.dateOfBirth}
                  onChange={handleChange}
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="Enter your date of birth"
                />{" "}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Business email<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.email}
                  onChange={handleChange}
                  type="text"
                  id="email"
                  name="email"
                  placeholder=""
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Phone number<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.phoneNumber}
                  onChange={handleChange}
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder=""
                />{" "}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Technology<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.technology}
                  onChange={handleChange}
                  type="text"
                  id="technology"
                  name="technology"
                  placeholder=""
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Joining Date<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.joiningDate}
                  onChange={handleChange}
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  placeholder="Enter your Joining date"
                />{" "}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Designation<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.designation}
                  onChange={handleChange}
                  type="text"
                  id="designation"
                  name="designation"
                  placeholder=""
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Salary<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.salary}
                  onChange={handleChange}
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="Enter salary"
                />{" "}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Education<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.education}
                  onChange={handleChange}
                  type="text"
                  id="education"
                  name="education"
                  placeholder=""
                />{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Work Experience<span className="text-danger"> *</span>
                </label>{" "}
								<input
									value={state.newEmployee.workExperience}
                  onChange={handleChange}
                  type="text"
                  id="workExperience"
                  name="workExperience"
                  placeholder=""
                />{" "}
              </div>
            </div>
            <div className="row justify-content-between text-left"></div>

            <div className="form-group">
							<div className="maxl">
                <label className="radio inline">
									<input
										id='male'
                    type="radio"
										checked={state.newEmployee.gender === "male"}
                    name="gender"
                    value="male"
                    onChange={(e) => handleChange(e)}
                  />
                  <span> Male </span>
								</label>
                <label style={{"marginLeft":"20px"}} className="radio inline">
									<input
										id='female'
                    type="radio"
										checked={state.newEmployee.gender === "female"}
                    name="gender"
                    value="female"
                    onChange={(e) => handleChange(e)}
                  />
                  <span>Female </span>
                </label>
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 ">
                <button
                  className="btn-block btn-primary"
                  onClick={handleCancle}
                >
                  Cancel
                </button>
              </div>
              <div className="form-group col-sm-6 ">
                <button
                  className="btn-block btn-primary"
                  onClick={addAndUpdateEmployee}
                >
                  {state.isEditEmployeeClicked
                    ? "Update Employee"
                    : "Add Employee"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
