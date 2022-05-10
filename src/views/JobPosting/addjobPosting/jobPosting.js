import React, { useState, useEffect  } from "react";
import {
  updateNewPostingAction,
  updateIsAddPostingClickedAction,
  updatePostingsAction,
  updateIsEditPostingClickedAction,
} from "../../../redux/jobPosting/jobPosting.actions";
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from "../../../API/EmployeeApi";
import { IoArrowBackSharp } from "react-icons/io5";
import { CButton } from "@coreui/react";
import { toast } from "react-toastify";
import Select from "react-select";
import { jobPostingRequests } from "src/API/JobPostingApi";

const jobPosting = () => {
  const [fieldsWithError, setFieldsWithError] = useState({
    jobTitle: false,
    department: false,
    managerId: false,
    effectiveDate: false,
    qualification: false,
    workExperience: false,
    vacantPositions: false,
    description: false,
  });
  const [errorInfo, setErrorInfo] = useState({});
  const [employees, setEmployees] = useState([]);
  const [tempManager, setTempManager] = useState({});
  const dispatch = useDispatch();
  const hrState = useSelector((state) => state.jobPosting);
  useEffect(() => {
    handleGetEmployeesApi();
  }, []);
  const handleGetEmployeesApi = async () => {
    try {
      const res = await employeeRequests.getEmployeesApi();
      debugger;
      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.name, label: x.name };
        });
        console.log("tempArr", tempArr);
        setEmployees(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(evt) {
    debugger;
    const value = evt.target ? evt.target.value : evt.value;
    const name = evt.target ? evt.target.name : evt.field;
    dispatch(
      updateNewPostingAction({
        ...hrState.newPosting,
        [name]: value,
      })
    );
  }
 
  const handleCancel = () => {
    dispatch(updateNewPostingAction({}));
    dispatch(updateIsAddPostingClickedAction(false));
    dispatch(updateIsEditPostingClickedAction(false));
  };

  const addAndUpdatePosting = async () => {
    debugger;
    if (!doValidation()) {
      if (hrState.isEditPostingClicked === true) {
        try {
          debugger;
          const res = await jobPostingRequests.updatejobPostingApi(
            hrState.newPosting
          );
          console.log("updatePosting Response", res);
          if (res.error === false) {
            debugger;
            toast.success("Posting Updated !");
            let temp = hrState.Postings.filter(
              (item) => item.id != res.data.id
            );
            dispatch(updatePostingsAction([...temp, res.data]));
            dispatch(updateIsAddPostingClickedAction(false));
            dispatch(updateIsEditPostingClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");
          debugger;
        }
      } else {
        try {
          debugger;
          const res = await jobPostingRequests.addjobPostingApi(
            hrState.newPosting
          );
          console.log("addjobPostingApi Response", res);
          debugger;
          if (res.error === false) {
            toast.success("Posting Added !");
            debugger;
            dispatch(updatePostingsAction([...hrState.Postings, res.data]));
            dispatch(updateIsAddPostingClickedAction(false));
            dispatch(updateIsEditPostingClickedAction(false));
          }
        } catch (e) {
          debugger;
          toast.error("error");
        }
      }
    } else {
      toast.error("validation failed");
      console.log("validation failed");
      debugger;
    }
  };
 
  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };
    debugger;

    Object.entries(fieldsWithError).forEach((x) => {
      debugger;
      if (hrState.newPosting[x[0]] !== undefined) {
        if (hrState.newPosting[x[0]] !== "") {
          if (x[0] === "jobTitle" || x[0] === "department") {
            isError = fieldsWithError[x[0]];
          } else {
            tempFieldsWithError[x[0]] = false;
            tempErrorInfo[x[0]] = null;
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
    debugger;
    setErrorInfo(tempErrorInfo);
    setFieldsWithError(tempFieldsWithError);
    Object.entries(tempFieldsWithError).forEach((x) => {
      if (x[1] === true) {
        isError = true;
      }
    });
    console.log("isError", isError);
    return isError;
  };
  const handleProjectManagerSelectChange = (param) => {

    dispatch(
      updateNewPostingAction({
        ...hrState.newPosting,
        managerId: param.id,
      })
    );
    /*  setTempManager({
      ...tempManager,
       managerId: param.id,
     }); */

   
  };
  console.log("tempManager", tempManager);
  return (
    <div>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="card">
            <form className="form-card">
              <button
                className="btn btn-outline-primary mb-3"
                onClick={handleCancel}
              >
                <IoArrowBackSharp />
              </button>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label">
                    Job Title <span className="text-danger"> *</span>
                  </label>
                  <input
                   className={
                    fieldsWithError.jobTitle === true ? "redBorder" : ""
                  }
                  value={hrState.newPosting.jobTitle}
                  onChange={handleChange}
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Enter job title"
                  />{" "}
                   {fieldsWithError.jobTitle === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.jobTitle}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Department<span className="text-danger"> *</span>
                  </label>
                  <input className={
                      fieldsWithError.department === true ? "redBorder" : ""
                    }
                  value={hrState.newPosting.department}
                  onChange={handleChange}
                    type="text"
                    id="department"
                    name="department"
                    placeholder="Enter Department"
                    
                    
                  />{" "}
                   {fieldsWithError.department === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.department}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
      
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label">
                    Reports to<span className="text-danger"> *</span>
                  </label>
                  <Select
                    type="text"
                    id="managerId"
                    name="managerId"
                    
                    
                    options={employees}
                    onChange={handleProjectManagerSelectChange}
                  ></Select>{" "}
                  {fieldsWithError.managerId === true ? (
                   <>
                   <label className="error form-control-label px-3">
                     {errorInfo.managerId}
                   </label>{" "}
                 </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label">
                    Effective Date<span className="text-danger"> *</span>
                  </label>
                  <input
                  className={
                    fieldsWithError.effectiveDate === true ? "redBorder" : ""
                  }
                  value={hrState.newPosting.effectiveDate}
                    onChange={handleChange}
                    type="date"
                    id="effectiveDate"
                    name="effectiveDate"
                    placeholder=""
                    
                  />{" "}
                  {fieldsWithError.effectiveDate === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.effectiveDate}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label">
                    Qualification<span className="text-danger"> *</span>
                  </label>
                  <input
                  className={
                    fieldsWithError.qualification === true ? "redBorder" : ""
                  }
                  value={hrState?.newPosting?.qualification}
                    onChange={handleChange}
                    type="text"
                    id="qualification"
                    name="qualification"
                    placeholder=""
                    
                  />{" "}
                  {fieldsWithError.qualification === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.qualification}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                  
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label ">
                    Work Experience<span className="text-danger"> *</span>
                  </label>
                  <input
                  className={
                    fieldsWithError.workExperience === true ? "redBorder" : ""
                  }
                  value={hrState?.newPosting?.workExperience}
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
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label ">
                    Vacant Positions<span className="text-danger"> *</span>
                  </label>
                  <input
                  className={
                    fieldsWithError.vacantPositions === true ? "redBorder" : ""
                  }
                  value={hrState?.newPosting?.vacantPositions}
                  onChange={handleChange}
                    type="text"
                    id="vacantPositions"
                    name="vacantPositions"
                    placeholder=""
                    
                  />{" "}
                  {fieldsWithError.vacantPositions === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.vacantPositions}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-12 flex-column d-flex">
                  <label className="form-control-label">
                    Job Description
                    <span className="text-danger"> *</span>
                  </label>
                  <textarea
                  className={
                    fieldsWithError.description === true ? "redBorder" : ""
                  }
                  value={hrState?.newPosting?.description}
                  onChange={handleChange}
                    
                    id="description"
                    name="description"
                    placeholder="Write your description here."
                    rows="4"
                    
                  ></textarea>{" "}
                   {fieldsWithError.description === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.description}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="form-group col-sm-6 ">
                  <button
                    className="btn-block btn-primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="form-group col-sm-6">
                  <CButton
                    className="btn-block btn-primary"
                    onClick={() => addAndUpdatePosting()}
                  >
                    {hrState.isEditPostingClicked
                      ? "Update Posting"
                      : "Add Posting"}
                  </CButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default jobPosting;
