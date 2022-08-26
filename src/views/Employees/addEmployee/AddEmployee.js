import React, { useEffect, useState } from "react";

import {
  updateNewEmployeeAction,
  updateEmployeesAction,
  updateIsAddEmployeeClickedAction,
  updateIsEditEmployeeClickedAction,
} from "../../../redux/Employees/employees.actions";
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from "src/API/EmployeeApi";
import { candidateRequests } from "src/API/CandidateApi";
import { IoArrowBackSharp } from "react-icons/io5";
import Select from "react-select";
import { CButton } from "@coreui/react";
import { toast } from "react-toastify";
import axios from "axios"

// import backIcon from '/src/assets/back-icon.png'

const AddEmployee = ({}) => {
  const empStatusOptions = [
    { value: "Active", label: "Active", field: "status" },
    { value: "Pending", label: "Pending", field: "status" },
    { value: "Associated", label: "Associated", field: "status" },
    { value: "FreePool", label: "FreePool", field: "status" },
    { value: "OnLeave", label: "OnLeave", field: "status" },
  ];

  const empDesignationOptions = [
    {
      value: "Software Engineer",
      label: "Software Engineer",
      field: "designation",
    },
    {
      value: "Sr.Software Engineer",
      label: "Sr.Software Engineer",
      field: "designation",
    },
    { value: "Team Lead", label: "Team Lead", field: "designation" },
    { value: "SQA Engineer", label: "SQA Engineer", field: "designation" },
    {
      value: "Sr.SQA Engineer",
      label: "Sr.SQA Engineer",
      field: "designation",
    },
    {
      value: "Automation Engineer",
      label: "Automation Engineer",
      field: "designation",
    },
    {
      value: "Sr.Automation Engineer",
      label: "Sr.Automation Engineer",
      field: "designation",
    },
    { value: "HR", label: "HR", field: "designation" },
    { value: "Other", label: "Other", field: "designation" },
  ];

  const [fieldsWithError, setFieldsWithError] = useState({
    name: false,
    employee_No: false,
    cnic: false,
    personalEmail: false,
    address: false,
    dateOfBirth: false,
    email: false,
    phoneNumber: false,
    joiningDate: false,
    designation: false,
    salary: false,
    education: false,
    linkedInProfile: false,
    gender: false,
    status: false,
    permanentDate: false,
    workExperience:false,
    technology:false,
    appointmentLetterStatus: false,
    agreementSignStatus: false,
  });
  const [errorInfo, setErrorInfo] = useState({});
  const dispatch = useDispatch();
  const [candidates, setCandidates] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const state = useSelector((state) => state.employees);
 useEffect(()=>{
   handleGetCandidatesApi();
 }, []);

  function handleChange(evt) {
         
    const value = evt.target.value;
    dispatch(
      updateNewEmployeeAction({
        ...state.newEmployee,
        [evt.target.name]: value,
      })
    );
  }
  const handleCancel = () => {
    dispatch(updateNewEmployeeAction({}));
    dispatch(updateIsAddEmployeeClickedAction(false));
    dispatch(updateIsEditEmployeeClickedAction(false));
  };

  const changeHandler = (event) => {

    setSelectedFile(event.target.files[0])

    setIsFilePicked(true);


  };

  const handleSubmission = async () => {
    let body = new FormData()
    body.set('key', '11017bd402e05bad935969f001eeeebf')
    body.append('image', selectedFile)

   const response= await axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    })
    const url=response.data?.data?.display_url;
return url;



  };



  const handleGetCandidatesApi = async () => {
    try {
      const res = await candidateRequests.getHiredCandidatesApi();

      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.FirstName + " " + x.lastName, label: x.FirstName + " " + x.lastName };
        });
        // console.log("candidates", tempArr);
        setCandidates(tempArr);
      }
    } catch (err) {
      // console.log(err);
    }
  };
  const addAndUpdateEmployee = async () => {
         
    if (!doValidation()) {
      if (state.isEditEmployeeClicked === true) {
        try {
              const profile_url= await handleSubmission();
            
              state.newEmployee.profile_url=profile_url;
          const res = await employeeRequests.updateEmployeeApi(state.newEmployee);
          console.log("updateEmployee Response", res);
          if (res.error === false) {
                 
            toast.success("Employee Updated !");
            let temp = state.employees.filter((item) => item.id != res.data.id);
            dispatch(updateEmployeesAction([...temp, res.data]));
            dispatch(updateIsAddEmployeeClickedAction(false));
            dispatch(updateIsEditEmployeeClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");
               
        }
      } else {
        try {
          const profile_url= await handleSubmission();
            
          state.newEmployee.profile_url=profile_url;
          const res = await employeeRequests.addEmployeeApi(state.newEmployee);
          console.log("addEmployeeApi Response", res);
               
          if (res.error === false) {
            toast.success("Employee Added !");
                 
            dispatch(updateEmployeesAction([...state.employees, res.data]));
            dispatch(updateIsAddEmployeeClickedAction(false));
            dispatch(updateIsEditEmployeeClickedAction(false));
          }
        } catch (e) {
               
          toast.error("error");
        }
      }
    } else {
      toast.error("validation failed");
      console.log("validation failed");
           
    }
  };
  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };
         

    Object.entries(fieldsWithError).forEach((x) => {
           
      if (state.newEmployee[x[0]] !== undefined) {
        if (state.newEmployee[x[0]] !== "") {
          if (x[0] === "email" || x[0] === "phoneNumber") {
            isError = fieldsWithError[x[0]];
          } else {
            tempFieldsWithError[x[0]] = false;
            tempErrorInfo[x[0]] = false;
            isError = false;
          }
        } else {
               
          tempFieldsWithError[x[0]] = true;
          tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
          isError = true;
        }
      } else {
             
        tempFieldsWithError[x[0]] = true;
        tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
        isError = true;
      }
    });
         
    setErrorInfo(tempErrorInfo);
    setFieldsWithError(tempFieldsWithError);
    Object.entries(tempFieldsWithError).forEach((x) => {
      if (x[1] === true) {
             
        isError = true;
      }
    });
    
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
      setFieldsWithError({
        ...fieldsWithError,
        phoneNumber: true,
      });
      setErrorInfo({
        ...errorInfo,
        phoneNumber: "only Numbers allowed",
      });
    } else {
      setFieldsWithError({
        ...fieldsWithError,
        phoneNumber: false,
      });
    }
  }
  const handleReactSelectChange = (param) => {
    dispatch(
      updateNewEmployeeAction({
        ...state.newEmployee,
        [param.field]: param.value,
      })
    );
  };
  const handleReactChange = (param) => {
    dispatch(
      updateNewEmployeeAction({
        ...state.newEmployee,
        name: param.value,
      })
    );
  };

/*   console.log("fieldsWithError", fieldsWithError);
  console.log("errorInfo", errorInfo);
  console.log("state", state); */

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
                  id="name"
                  name="name"
                  options={candidates}
                  onChange={handleReactChange}
                  ></Select>
                  {/* <input
                    className={fieldsWithError.name === true ? "redBorder" : ""}
                    value={state.newEmployee.name}
                    onChange={handleChange}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                  /> */}{" "}
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
                  <label className="form-control-label px-3">
                    Employee No.<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.employee_No === true ? "redBorder" : ""
                    }
                    // value={state.newEmployee.employee_No?state.newEmployee.employee_No:"emp-"+(state.employees.length+1)}
                    value={state.newEmployee.employee_No}
                    onChange={handleChange}
                    type="text"
                    id="employee_No"
                    name="employee_No"
											placeholder="Enter Employee No."
											disabled
                    // onBlur={(e) => validateNumberOnly(e.target.value)}
                  />{" "}
                  {fieldsWithError.employee_No === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.employee_No}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    CNIC<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={fieldsWithError.cnic === true ? "redBorder" : ""}
                    value={state.newEmployee.cnic}
                    onChange={handleChange}
                    type="text"
                    id="cnic"
                    name="cnic"
                    placeholder="Enter your CNIC"
                  />{" "}
                  {fieldsWithError.cnic === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.cnic}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Date of Birth<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.dateOfBirth === true ? "redBorder" : ""
                    }
                    value={state?.newEmployee?.dateOfBirth?.slice(0, 10)}
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
                  <label className="form-control-label px-3">
                    Business email<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.email === true ? "redBorder" : ""
                    }
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
                  <label className="form-control-label px-3">
                    Personal Email<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.personalEmail === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.personalEmail}
                    onChange={handleChange}
                    type="text"
                    id="personalEmail"
                    name="personalEmail"
                    placeholder=""
                    onBlur={(e) => validateEmail(e.target.value)}
                  />{" "}
                  {fieldsWithError.personalEmail === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.personalEmail}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Home Address<span className="text-danger"> *</span>
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
                  <label className="form-control-label px-3">
                    Gender<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    /* value={} */
                    value={{
                      label: state.newEmployee.gender
                        ? state.newEmployee.gender.charAt(0).toUpperCase() +
                          state.newEmployee.gender.slice(1)
                        : null,
                      value: state.newEmployee.gender,
                    }}
                    id="gender"
                    name="gender"
                    options={[
                      { label: "Male", value: "male", field: "gender" },
                      { label: "Female", value: "female", field: "gender" },
                    ]}
                    onChange={handleReactSelectChange}
                  ></Select>{" "}
                  {fieldsWithError.gender === true ? (
                    <div>
                      <label style={{ color: "red" }}>please select one</label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Status<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    /* value={} */
                    value={{
                      label: state.newEmployee.status
                        ? state.newEmployee.status.charAt(0).toUpperCase() +
                          state.newEmployee.status.slice(1)
                        : null,
                      value: state.newEmployee.status,
                    }}
                    id="status"
                    name="status"
                    options={empStatusOptions}
                    onChange={handleReactSelectChange}
                  ></Select>{" "}
                  {fieldsWithError.status === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.status}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Permanent Date<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.permanentDate === true ? "redBorder" : ""
                    }
                    value={state?.newEmployee?.permanentDate?.slice(0, 10)}
                    onChange={handleChange}
                    type="date"
                    id="permanentDate"
                    name="permanentDate"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.permanentDate === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.permanentDate}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Joining Date<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.joiningDate === true ? "redBorder" : ""
                    }
                    value={state?.newEmployee?.joiningDate?.slice(0, 10)}
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
                  <label className="form-control-label px-3">
                    Designation<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    /* value={} */
                    value={{
                      label: state.newEmployee.designation
                        ? state.newEmployee.designation
                            .charAt(0)
                            .toUpperCase() +
                          state.newEmployee.designation.slice(1)
                        : null,
                      value: state.newEmployee.designation,
                    }}
                    id="designation"
                    name="designation"
                    options={empDesignationOptions}
                    onChange={handleReactSelectChange}
                  ></Select>{" "}
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
                  <label className="form-control-label px-3">
                    Salary<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.salary === true ? "redBorder" : ""
                    }
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
                  <label className="form-control-label px-3">
                    Qualification<span className="text-danger"> *</span>
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
                  <label className="form-control-label px-3">
                    LinkedIn Profile<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.linkedInProfile === true ? "redBrder" : ""
                    }
                    value={state.newEmployee.linkedInProfile}
                    onChange={handleChange}
                    type="text"
                    id="linkedInProfile"
                    name="linkedInProfile"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.linkedInProfile === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.linkedInProfile}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
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
              <div className="row justify-content-between text-left">
                <div className="form-group col-6 flex-column d-flex">
                  <div>
                    <input type="file" name="file" onChange={changeHandler} />

                    {/* <div>
                      <button onClick={handleSubmission}>Submit</button>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <div className="maxl">
                    <label className="form-control-label px-3 radio inline">
                      Appointment Letter Status
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      id="appointmentLetterStatus"
                      type="radio"
                      checked={
                        state.newEmployee.appointmentLetterStatus === "true"
                      }
                      name="appointmentLetterStatus"
                      value="true"
                      onChange={(e) => handleChange(e)}
                    />
                    <span> Yes </span>

                    <label
                      style={{ marginLeft: "20px" }}
                      className="radio inline"
                    >
                      <input
                        id="appointmentLetterStatus"
                        type="radio"
                        checked={
                          state.newEmployee.appointmentLetterStatus === "false"
                        }
                        name="appointmentLetterStatus"
                        value="false"
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="ml-1">No </span>
                    </label>
                    {fieldsWithError.appointmentLetterStatus === true ? (
                      <div>
                        <label style={{ color: "red" }}>
                          please select one
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <div className="maxl">
                    <label className="form-control-label px-3 radio inline">
                      Agreement Sign Status
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      id="agreementSignStatus"
                      type="radio"
                      checked={state.newEmployee.agreementSignStatus === "true"}
                      name="agreementSignStatus"
                      value={true}
                      onChange={(e) => handleChange(e)}
                    />
                    <span> Yes </span>

                    <label
                      style={{ marginLeft: "20px" }}
                      className="radio inline"
                    >
                      <input
                        id="agreementSignStatus"
                        type="radio"
                        checked={
                          state.newEmployee.agreementSignStatus === "false"
                        }
                        name="agreementSignStatus"
                        value={false}
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="ml-1">No </span>
                    </label>
                    {fieldsWithError.agreementSignStatus === true ? (
                      <div>
                        <label style={{ color: "red" }}>
                          please select one
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
                    onClick={() => addAndUpdateEmployee()}
                  >
                    {state.isEditEmployeeClicked
                      ? "Update Employee"
                      : "Add Employee"}
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

export default AddEmployee;
