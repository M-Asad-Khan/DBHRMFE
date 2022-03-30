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
  const [fieldsWithError, setFieldsWithError] = useState({
    name: null,
    age: null,
    address: null,
    dateOfBirth: null,
    email: null,
    phoneNumber: null,
    technology: null,
    joiningDate: null,
    designation: null,
    salary: null,
    education: null,
    workExperience: null,
  });
  const [errorInfo, setErrorInfo] = useState({
    name: null,
    age: null,
    address: null,
    dateOfBirth: null,
    email: null,
    phoneNumber: null,
    technology: null,
    joiningDate: null,
    designation: null,
    salary: null,
    education: null,
    workExperience: null,
  });
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
    if (!doValidation()) {
      if (state.isEditEmployeeClicked === true) {
        try {
          debugger;
          const res = await updateEmployeeApi(state.newEmployee);
          console.log("updateEmployee Response", res);

          debugger;
          if (res.error === false) {
            debugger;
            alert("Employee Updated");
            let temp = state.employees.filter((item) => item.id != res.data.id);
            dispatch(updateEmployeesAction([...temp, res.data]));
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
    } else {
      console.log("validation failed");
      debugger;
    }
  };
  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = {};
    debugger;
    Object.entries(fieldsWithError).forEach((x) => {
      console.log("entries", x);
      if (state.newEmployee[x[0]] == undefined) {
        tempFieldsWithError[x[0]] = true;
        tempErrorInfo[x[0]] = "field cannot be empty;";
        isError = true;
      } else if (state.newEmployee[x[0]] == "") {
        tempFieldsWithError[x[0]] = true;
        tempErrorInfo[x[0]] = "field cannot be empty;";
        isError = true;
      } else if (fieldsWithError[x[0]] !== "") {
        tempFieldsWithError[x[0]] = false;
      } else if (fieldsWithError[x[0]] === true) {
        isError = true;
      } else {
        tempFieldsWithError[x[0]] = false;
      }
    });
    debugger;
    console.log("isError", isError);
    setErrorInfo(tempErrorInfo);
    setFieldsWithError(tempFieldsWithError);
    return isError;
  };
  function validateEmail(email) {
    {
      var regx = /\S+@\S+\.\S+/;
      if (regx.test(email)) {
        console.log(true);
        setFieldsWithError({
          ...fieldsWithError,
          email: false,
        });
      } else {
        console.log(false);
        setFieldsWithError({
          ...fieldsWithError,
          email: true,
        });
        setErrorInfo({
          ...errorInfo,
          email: "You have entered an invalid email address!",
        });
      }
    }
  }
  function validateNumberOnly(num) {
    var reg = new RegExp("^[0-9]*$");

		if (reg.test(num) == false) {
      console.log("if");
      setFieldsWithError({
        ...fieldsWithError,
        phoneNumber: true,
      });
      setErrorInfo({
        ...errorInfo,
        phoneNumber: "only Numbers allowed",
      });
		} else {
			console.log("ELSE")
      setFieldsWithError({
        ...fieldsWithError,
        phoneNumber: false,
      });
    }
  }
  console.log("fieldsWithError", fieldsWithError);
  console.log("errorInfo", errorInfo);

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
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
                  className={fieldsWithError.name === true ? "redBorder" : ""}
                  value={state.newEmployee.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                />{" "}
                {fieldsWithError.name === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.name}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Age<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={fieldsWithError.age === true ? "redBorder" : ""}
                  value={state.newEmployee.age}
                  onChange={handleChange}
                  type="text"
                  id="age"
                  name="age"
                  placeholder="Enter your age"
                  onBlur={(e) => validateNumberOnly(e.target.value)}
                />{" "}
                {fieldsWithError.age === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.age}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Address<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.address === true ? "redBorder" : ""
                  }
                  value={state.newEmployee.address}
                  onChange={handleChange}
                  type="text"
                  id="address"
                  name="address"
                  placeholder=""
                />{" "}
                {fieldsWithError.address === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.address}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Date of Birth<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.dateOfBirth === true ? "redBorder" : ""
                  }
                  value={state.newEmployee.dateOfBirth}
                  onChange={handleChange}
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="Enter your date of birth"
                />{" "}
                {fieldsWithError.dateOfBirth === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.dateOfBirth}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Business email<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={fieldsWithError.email === true ? "redBorder" : ""}
                  value={state.newEmployee.email}
                  onChange={handleChange}
                  type="text"
                  id="email"
                  name="email"
                  placeholder=""
                  onBlur={(e) => validateEmail(e.target.value)}
                />{" "}
                {fieldsWithError.email === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.email}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Phone number<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.phoneNumber === true ? "redBorder" : ""
                  }
                  value={state.newEmployee.phoneNumber}
                  onChange={handleChange}
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder=""
                  onBlur={(e) => validateNumberOnly(e.target.value)}
                />{" "}
                {fieldsWithError.phoneNumber === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.phoneNumber}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Technology<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.technology === true ? "redBorder" : ""
                  }
                  value={state.newEmployee.technology}
                  onChange={handleChange}
                  type="text"
                  id="technology"
                  name="technology"
                  placeholder=""
                />{" "}
                {fieldsWithError.technology === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.technology}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Joining Date<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.joiningDate === true ? "redBorder" : ""
                  }
                  value={state.newEmployee.joiningDate}
                  onChange={handleChange}
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  placeholder="Enter your Joining date"
                />{" "}
                {fieldsWithError.joiningDate === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.joiningDate}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Designation<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.designation === true ? "redBorder" : ""
                  }
                  value={state.newEmployee.designation}
                  onChange={handleChange}
                  type="text"
                  id="designation"
                  name="designation"
                  placeholder=""
                />{" "}
                {fieldsWithError.designation === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.designation}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Salary<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={fieldsWithError.salary === true ? "redBorder" : ""}
                  value={state.newEmployee.salary}
                  onChange={handleChange}
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="Enter salary"
                  onBlur={(e) => validateNumberOnly(e.target.value)}
                />{" "}
                {fieldsWithError.salary === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.salary}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Education<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.education === true ? "redBorder" : ""
                  }
                  value={state.newEmployee.education}
                  onChange={handleChange}
                  type="text"
                  id="education"
                  name="education"
                  placeholder=""
                />{" "}
                {fieldsWithError.education === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.education}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                {" "}
                <label className="form-control-label px-3">
                  Work Experience<span className="text-danger"> *</span>
                </label>{" "}
                <input
                  className={
                    fieldsWithError.workExperience === true ? "redBrder" : ""
                  }
                  value={state.newEmployee.workExperience}
                  onChange={handleChange}
                  type="text"
                  id="workExperience"
                  name="workExperience"
                  placeholder=""
                />{" "}
                {fieldsWithError.workExperience === true ? (
                  <>
                    <label className="error form-control-label px-3">
                      {errorInfo.workExperience}
                    </label>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row justify-content-between text-left"></div>

            <div className="form-group">
              <div className="maxl">
                <label className="radio inline">
                  <input
                    id="male"
                    type="radio"
                    checked={state.newEmployee.gender === "male"}
                    name="gender"
                    value="male"
                    onChange={(e) => handleChange(e)}
                  />
                  <span> Male </span>
                </label>
                <label style={{ marginLeft: "20px" }} className="radio inline">
                  <input
                    id="female"
                    type="radio"
                    checked={state.newEmployee.gender === "female"}
                    name="gender"
                    value="female"
                    onChange={(e) => handleChange(e)}
                  />
                  <span>Female </span>
                </label>
                {fieldsWithError.gender === true ? (
                  <div>
                    <label style={{ color: "red" }}>please select one</label>
                  </div>
                ) : (
                  ""
                )}
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
