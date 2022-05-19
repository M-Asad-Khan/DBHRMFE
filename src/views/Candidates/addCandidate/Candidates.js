import React, { useState } from "react";
import Select from "react-select";
import {
  updateNewCandidateAction,
  updateCandidatesAction,
  updateIsAddCandidateClickedAction,
  updateIsEditCandidateClickedAction,
} from "../../../redux/Candidates/candidates.actions";
import { CButton } from "@coreui/react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { candidateRequests } from "src/API/CandidateApi";
import { IoArrowBackSharp } from "react-icons/io5";

const Candidates = ({}) => {
  const [fieldsWithError, setFieldsWithError] = useState({
    FirstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    gender: false,
    status: false,
    postAppliedFor: false,
    AppliedDate: false,
    skills: false,
  });
  const [errorInfo, setErrorInfo] = useState({});
  const dispatch = useDispatch();
  const hrState = useSelector((state) => state.candidate);

  function handleChange(evt) {
    debugger;
    const value = evt.target ? evt.target.value : evt.value;
    const name = evt.target ? evt.target.name : evt.field;
    dispatch(
      updateNewCandidateAction({
        ...hrState.newCandidate,
        [name]: value,
      })
    );
  }
  const handleCancel = () => {
    dispatch(updateNewCandidateAction({}));
    dispatch(updateIsAddCandidateClickedAction(false));
    dispatch(updateIsEditCandidateClickedAction(false));
  };

  const addAndUpdateCandidate = async () => {
    debugger;
    if (!doValidation()) {
      if (hrState.isEditCandidateClicked === true) {
        try {
          debugger;
          const res = await candidateRequests.updateCandidateApi(hrState.newCandidate );
          console.log("updateCandidate Response", res);
          if (res.error === false) {
            debugger;
            toast.success("Candidate Updated !");
            let temp = hrState.candidates.filter(
              (item) => item.id != res.data.id
            );
            dispatch(updateCandidatesAction([...temp, res.data]));
            dispatch(updateIsAddCandidateClickedAction(false));
            dispatch(updateIsEditCandidateClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");
          debugger;
        }
      } else {
        try {
          debugger;
          const res = await candidateRequests.addCandidateApi(
            hrState.newCandidate);
          console.log("addCandidateApi Response", res);
          debugger;
          if (res.error === false) {
            toast.success("Candidate Added !");
            debugger;
            dispatch(updateCandidatesAction([...hrState.candidates, res.data]));
            dispatch(updateIsAddCandidateClickedAction(false));
            dispatch(updateIsEditCandidateClickedAction(false));
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
      if (hrState.newCandidate[x[0]] !== undefined) {
        if (hrState.newCandidate[x[0]] !== "") {
          if (x[0] === "email" || x[0] === "phoneNumber") {
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
      console.log(false);
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
  console.log("fieldsWithError", fieldsWithError);
  console.log("errorInfo", errorInfo);

  const candStatusOptions = [
    { value: "Applied", label: "Applied", field: "status" },
    { value: "Scheduled", label: "Scheduled Interview", field: "status" },
    { value: "Offered", label: "Offered", field: "status" },
    { value: "Hired", label: "Hired", field: "status" },
    { value: "Rejected", label: "Rejected", field: "status" },
    { value: "NotAppeared", label: "Not Appeared", field: "status" },
  ];
  return (
    <>
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
                  <label className="form-control-label px-3">
                    First name<span className="text-danger"> *</span>
                  </label>
                  <input
                    className={
                      fieldsWithError.FirstName === true ? "redBorder" : ""
                    }
                    value={hrState.newCandidate.FirstName}
                    onChange={handleChange}
                    type="text"
                    id="FirstName"
                    name="FirstName"
                    placeholder="Enter your first name"
                  />{" "}
                  {fieldsWithError.FirstName === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.FirstName}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Last name<span className="text-danger"> *</span>
                  </label>
                  <input
                    className={
                      fieldsWithError.lastName === true ? "redBorder" : ""
                    }
                    value={hrState.newCandidate.lastName}
                    onChange={handleChange}
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                  />{" "}
                  {fieldsWithError.lastName === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.lastName}
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
                    Email<span className="text-danger"> *</span>
                  </label>
                  <input
                    className={
                      fieldsWithError.email === true ? "redBorder" : ""
                    }
                    value={hrState.newCandidate.email}
                    onChange={handleChange}
                    type="text"
                    id="email"
                    name="email"
                    placeholder=""
                    onBlur={(e) => validateEmail(e.target.value)}
                  />
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
                    Phone number<span className="text-danger"> *</span>
                  </label>
                  <input
                    className={
                      fieldsWithError.phoneNumber === true ? "redBorder" : ""
                    }
                    value={hrState.newCandidate.phoneNumber}
                    onChange={handleChange}
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder=""
                    onBlur={(e) => validateNumberOnly(e.target.value)}
                  />
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
                  </label>
                  {""}

                  <Select
                    id="gender"
                    name="gender"
                    value={{
                      label: hrState.newCandidate.gender
                        ? hrState.newCandidate.gender.charAt(0).toUpperCase() +
                          hrState.newCandidate.gender.slice(1)
                        : null,
                      value: hrState.newCandidate.gender,
                    }}
                    options={[
                      { label: "Male", value: "male", field: "gender" },
                      { label: "Female", value: "female", field: "gender" },
                    ]}
                    onChange={handleChange}
                  ></Select>
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Status<span className="text-danger"> *</span>
                  </label>
                  <Select
                    /* value={} */

                    id="status"
                    name="status"
                    value={{
                      label: hrState.newCandidate.status
                        ? hrState.newCandidate.status.charAt(0).toUpperCase() +
                          hrState.newCandidate.status.slice(1)
                        : null,
                      value: hrState.newCandidate.status,
                    }}
                    options={candStatusOptions}
                    onChange={handleChange}
                  ></Select>
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Post Applied for?
                    <span className="text-danger"> *</span>
                  </label>
                  <input
                    className={
                      fieldsWithError.postAppliedFor === true ? "redBorder" : ""
                    }
                    type="text"
                    value={hrState.newCandidate.postAppliedFor}
                    onChange={handleChange}
                    id="postAppliedFor"
                    name="postAppliedFor"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.postAppliedFor === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.postAppliedFor}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Applied Date<span className="text-danger"> *</span>
                  </label>
                  <input
                    className={
                      fieldsWithError.AppliedDate === true ? "redBorder" : ""
                    }
                    value={hrState.newCandidate.AppliedDate}
                    onChange={handleChange}
                    type="date"
                    id="AppliedDate"
                    name="AppliedDate"
                    placeholder=""
                  />
                  {fieldsWithError.AppliedDate === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.AppliedDate}
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
                    Skills
                    <span className="text-danger"> *</span>
                  </label>
                  <textarea
                    className={
                      fieldsWithError.skills === true ? "redBorder" : ""
                    }
                    value={hrState.newCandidate.skills}
                    onChange={handleChange}
                    id="skills"
                    name="skills"
                    placeholder="Write your skills here"
                    rows="4"
                    required="required"
                  ></textarea>
                  {fieldsWithError.skills === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.skills}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
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
                    onClick={() => addAndUpdateCandidate()}
                  >
                    {hrState.isEditCandidateClicked
                      ? "Update Candidate"
                      : "Add Candidate"}
                  </CButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidates;
