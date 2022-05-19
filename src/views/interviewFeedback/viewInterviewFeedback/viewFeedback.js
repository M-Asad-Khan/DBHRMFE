import React, { useState } from "react";
import "./viewFeedback.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewFeedbackClickedAction,
  updateNewFeedbackAction,
} from "src/redux/interviewFeedback/interviewFeedback.actions";
import { RiSettings2Line } from "react-icons/ri";
import { IoArrowBackSharp } from "react-icons/io5";
const ViewFeedback = () => {
  const hrState = useSelector((state) => state.interviewFeedback);
  let count = 0 ;
  let feedBackQuestion = hrState.newFeedback;
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(updateIsViewFeedbackClickedAction(false));
    dispatch(updateNewFeedbackAction({}));
    count = 0;
  };
  for (let i=0 ; i< feedBackQuestion.length ; i++ ){
    count = count + parseInt(feedBackQuestion[i].rating)
  }
  return (
    <>
      <div className="container-fluid px-1 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12">
            <div className="card">
              <div className="">
                <div className="">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleCancel}
                  >
                    <IoArrowBackSharp />
                  </button>
                </div>
              </div>
              <div className="form-card " style={{ height: "auto",margin:"4px 10%"}}>
                <h2 className=" text-capitalize text-center d-flex justify-content-center p-2 ">Interview FeedBack form</h2>
                <div className="d-flex">
                      <div className="d-flex w-100">
                          <label className=" d-flex font-weight-bold" style={{ color: "dimgrey" }}>
                            Candidate Name:
                          </label>&nbsp;&nbsp;
                          <span >{hrState?.newFeedback[0]?.candidate?.FirstName}</span>
                      </div>
                      <div className="d-flex w-100 justify-content-end">
                          <label className=" d-flex font-weight-bold" style={{ color: "dimgrey" }}>
                            Interviewer Name:
                          </label>&nbsp;&nbsp;
                          <span >{hrState?.newFeedback[0]?.interViewer?.name}</span>
                      </div>
                </div>
                <div className="d-flex">
                    <div className="d-flex w-100">
                            <label className=" d-flex font-weight-bold" style={{ color: "dimgrey" }}>
                                    Date of Interview:
                                  </label>&nbsp;&nbsp;
                            <span >{hrState?.newFeedback[0]?.dateOfInterview?.slice(0, 10)}</span>
                    </div>
                    <div className="d-flex w-100 justify-content-end">
                            <label className=" d-flex font-weight-bold" style={{ color: "dimgrey" }}>
                            Position:
                            </label>&nbsp;&nbsp;
                            <span >{hrState?.newFeedback[0]?.position?.jobTitle}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-hover bg-white">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Job Interview Criteria</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Comments</th>
                </tr>
              </thead>
              <tbody>
              {feedBackQuestion.length > 0 ? (
              feedBackQuestion.map((x,i)=>{
                return (
                  <tr key={i}>
                      <td scope="row" className="font-weight-bold">{i+1}</td>
                      <td scope="row">{x.question.question}</td>
                      <td>
                        {x.rating}
                      </td>
                      <td>
                        {x.comment}
                      </td>
                  </tr>
                )
                }) ): ""}
                <tr>
                  <td colSpan="2" className="text-center font-weight-bold">Result</td>
                  <td  className=" font-weight-bold">{(count/50)*100}%</td>
                  <td  className=" font-weight-bold">{(count/50)*100 > 90 ? " Highly Recommended" : (count/50)*100 > 80 ?  " Recommended" : " Average"}</td>
                </tr>
              </tbody>
            </table>
      </div>
    </>
  );
};
export default ViewFeedback;