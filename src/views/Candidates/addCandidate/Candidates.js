import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  updateNewCandidateAction,
  updateCandidatesAction,
  updateIsAddCandidateClickedAction,
  updateIsEditCandidateClickedAction,
} from "../../../redux/Candidates/candidates.actions";

import { CButton, CLink } from "@coreui/react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { candidateRequests } from "src/API/CandidateApi";
import { jobPostingRequests } from "src/API/JobPostingApi";
import { IoArrowBackSharp } from "react-icons/io5";
import CIcon from '@coreui/icons-react';

import { cibAddthis } from '@coreui/icons'

import { PickerOverlay, PickerDropPane } from 'filestack-react';

const Candidates = ({ }) => {
  const [fieldsWithError, setFieldsWithError] = useState({
    FirstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    gender: false,
    status: false,
    positionId: false,
    AppliedDate: false,
    skills: false,

  });
  const [errorInfo, setErrorInfo] = useState({});
  const dispatch = useDispatch();
  const hrState = useSelector((state) => state.candidate);
  const [postings, setPostings] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isImagePicked, setIsImagePicked] = useState(false);
  const [reload,setIsRealod]=useState(false)

  useEffect(() => {
    handleGetJobPostingsApi();
  }, []);





  function handleChange(evt) {

    const value = evt.target ? evt.target.value : evt.value;
    const name = evt.target ? evt.target.name : evt.field;
    dispatch(
      updateNewCandidateAction({
        ...hrState.newCandidate,
        [name]: value,
      })
    );
  }
  function handleReactChange(evt, field) {


    dispatch(
      updateNewCandidateAction({
        ...hrState.newCandidate,
        [field]: evt.id,
      })
    );
  }


  const handleCancel = () => {
    dispatch(updateNewCandidateAction({}));
    dispatch(updateIsAddCandidateClickedAction(false));
    dispatch(updateIsEditCandidateClickedAction(false));
  };

  const addAndUpdateCandidate = async () => {

    if (!doValidation()) {
      if (hrState.isEditCandidateClicked === true) {
        try {
          const res = await candidateRequests.updateCandidateApi(hrState.newCandidate);
          console.log("updateCandidate Response", res);
          if (res.error === false) {

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

        }
      } else {
        try {
          const res = await candidateRequests.addCandidateApi(
            hrState.newCandidate);
          console.log("addCandidateApi Response", res);

          if (res.error === false) {
            toast.success("Candidate Added !");

            dispatch(updateCandidatesAction([...hrState.candidates, res.data]));
            dispatch(updateIsAddCandidateClickedAction(false));
            dispatch(updateIsEditCandidateClickedAction(false));
          }
        } catch (e) {

          toast.error("error");
        }
      }
    } else {
      toast.error("validation failed");
      //console.log("validation failed");

    }
  };
  const handleGetJobPostingsApi = async () => {
    try {
      const res = await jobPostingRequests.getjobPostingsApi();

      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return {
            ...x,
            value: x.jobTitle, label: x.jobTitle
          };
        });
        //console.log("tempArr", tempArr);
        setPostings(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };


    Object.entries(fieldsWithError).forEach((x) => {

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
          tempErrorInfo[x[0]] = "Please enter required fields";
          isError = true;
        }
      } else {
        tempFieldsWithError[x[0]] = true;
        tempErrorInfo[x[0]] = "Please enter required fields";
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
    // console.log("isError", isError);
    return isError;
  };

  const uploadDone = (res, type) => {
    if (type == 'pic') {
      hrState.newCandidate.picture = res.filesUploaded[0].url;
     
    
    }
    else {
      hrState.newCandidate.resumelink = res.filesUploaded[0].url;
      
    
    }
    setIsRealod(!reload);
  }

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
  // console.log("fieldsWithError", fieldsWithError);
  // console.log("errorInfo", errorInfo);

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
      {/* <LoadingOverlay
        active={isFileUploading}
        spinner
        text='Loading your content...'
      > */}
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
                        { label: "Male", value: "Male", field: "gender" },
                        { label: "Female", value: "Female", field: "gender" },
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
                    <Select
                      className={
                        fieldsWithError.positionId === true ? "redBorder" : ""
                      }
                      type="text"
                      id="positionId"
                      name="positionId"
                      onChange={(event) => handleReactChange(event, 'positionId')}
                      options={postings}

                    ></Select>{" "}
                    {fieldsWithError.positionId === true ? (
                      <>
                        <label className="error form-control-label px-3">
                          {errorInfo.positionId}
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
                      value={hrState?.newCandidate?.AppliedDate?.slice(0, 10)}
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
                  <div className="form-group col-6 flex-column d-flex">
                    <label className="form-control-label">
                      Upload image
                    </label>
                    <CIcon size={'3xl'} icon={cibAddthis} onClick={() => {
                      setIsImagePicked(true)
                    
                     
                    }} />

                    {hrState.newCandidate.picture ?
                      <CLink
                        href={hrState.newCandidate.picture}
                        target="_blank"
                      >
                        {hrState.newCandidate.picture}  Picture
                      </CLink>
                      : <></>}

                    {isImagePicked ?
                      <PickerOverlay
                        pickerOptions={{
                          accept: "image/*",
                          onClose: (res) => {
                            setIsImagePicked(false);
                          }
                        }}
                        apikey={'AUs6NdV3RbWNpyzRd3VH1z'}
                        // onSuccess={(res) => console.log(res)}

                        onSuccess={(res) => uploadDone(res, 'pic')}
                      />
                      : <></>}
                  </div>
                  <div className="form-group col-6 flex-column d-flex">
                    <label className="form-control-label">
                      Upload resume
                    </label>
                    <CIcon size={'3xl'} icon={cibAddthis} onClick={() => { setIsFilePicked(true) }} />
                    {hrState.newCandidate.resumelink ?
                      <CLink
                        href={hrState.newCandidate.resumelink}
                        target="_blank"
                      >
                        {hrState.newCandidate.resumelink}
                      </CLink>
                      : <></>}


                    {isFilePicked ?
                      <PickerOverlay
                        pickerOptions={{
                          accept: ["text/*", ".pdf"],
                          onClose: () => {
                            setIsFilePicked(false)
                          }
                        }}
                        apikey={'AUs6NdV3RbWNpyzRd3VH1z'}
                        onSuccess={(res) => console.log(res)}
                        onUploadDone={(res) => uploadDone(res, 'resume')}

                      />
                      : <></>}

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
      {/* </LoadingOverlay> */}
    </>
  );
};

export default Candidates;
