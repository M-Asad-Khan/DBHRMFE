import React, { useState } from "react";
import {
  updateNewPostingAction,
  updateIsAddPostingClickedAction,
  updatePostingsAction,
  updateIsEditPostingClickedAction,
} from "../../../redux/jobPosting/jobPosting.actions";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import { CButton } from "@coreui/react";
import { toast } from "react-toastify";
import { jobPostingRequests } from "src/API/JobPostingApi";


const jobPosting = () => {
  const [fieldsWithError, setFieldsWithError] = useState({
    question: false,
    jobtitle: false,
    department: false,
    date: false,
    
    
  });
  const [errorInfo, setErrorInfo] = useState({});
  const dispatch = useDispatch();
  const hrState = useSelector((state) => state.candidate);

  function handleChange(evt) {
    debugger;
    const value = evt.target.value;
    dispatch(
      updateNewPostingAction({
        ...hrState.newPosting,
        [evt.target.name]: value,
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
            let temp = hrState.positions.filter(
              (item) => item.id != res.data.id
            );
            dispatch(updateCandidatesAction([...temp, res.data]));
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
            hrState.newCandidate
          );
          console.log("addjobPostingApi Response", res);
          debugger;
          if (res.error === false) {
            toast.success("Posting Added !");
            debugger;
            dispatch(updatePostingsAction([...hrState.candidates, res.data]));
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
                      type="text"
                      id="jobtitle"
                      name="jobtitle"
                      placeholder="Enter job title"
                     
                    />{" "}
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">

                    <label className="form-control-label px-3">

                      Department<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      placeholder="Enter Department"
                      onblur="validate(2)"
                    />{" "}
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label">
                      Reports to<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="report"
                      name="report"
                      placeholder=""
                      onblur="validate(3)"
                    />{" "}
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label">
                      Effective Date<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      placeholder=""
                      onblur="validate(4)"
                    />{" "}
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label">
                      Qualification<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="qualification"
                      name="qualification"
                      placeholder=""
                      onblur="validate(5)"
                    />{" "}
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label ">
                      Work Experience<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="workExperience"
                      name="workExperience"
                      placeholder=""
                      onblur="validate(2)"
                    />{" "}
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label ">
                    Vacant Positions<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="vacantPosition"
                      name="vacantPosition"
                      placeholder=""
                      onblur="validate(5)"
                    />{" "}
                  </div>
                  </div>
                
                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <label className="form-control-label">
                      Job Description
                      <span className="text-danger"> *</span>
                    </label>
                    <textarea
                             
                              onChange={handleChange}
                              id="description"
                              name="description"
                              placeholder="Write your description here."
                              rows="4"
                              required="required"
                              
                            ></textarea>{" "}
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
