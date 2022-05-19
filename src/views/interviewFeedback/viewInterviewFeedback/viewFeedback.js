import React from "react";
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
  
  let feedBackQuestion = hrState.newFeedback;
  const dispatch = useDispatch();



  const handleCancel = () => {
    dispatch(updateIsViewFeedbackClickedAction(false));
    dispatch(updateNewFeedbackAction({}));
  };
 console.log("hrState.hrState.newFeedback",hrState.newFeedback)
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

              <div className="form-card" style={{ height: "100px" }}>
                <div className="d-flex">
                
               <h6 className=" d-flex" style={{ color: "dimgrey" }}>
                    Candidate Name:
                  </h6>
              <div className="col-6">{hrState?.newFeedback[0]?.candidate?.FirstName}</div>
                <h6 className=" d-flex" style={{ color: "dimgrey" }}>
                    Interviewer Name:
                  </h6>
              <div className="col-6">{hrState?.newFeedback[0]?.interViewer?.name}</div>
            </div>
            <div className="d-flex">
                
               <h6 className=" d-flex" style={{ color: "dimgrey" }}>
                    Date of Interview:
                  </h6>
              <div className="col-6">{hrState?.newFeedback[0]?.dateOfInterview?.slice(0, 10)}</div>
                <h6 className=" d-flex" style={{ color: "dimgrey" }}>
                  Position:
                  </h6>
              <div className="col-6">{hrState?.newFeedback[0]?.position?.jobTitle}</div>
            </div>
                
                

              </div>
            </div>
          </div>
        </div>

        <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Job Interview Criteria</th>
                  <th scope="col">Ranking</th>
                  <th scope="col">Comments</th>
                </tr>
              </thead>
              <tbody>
              
              {feedBackQuestion.length > 0 ? (
              
              feedBackQuestion.map((x,i)=>{
                return (
                  <tr key={i}>
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
              </tbody>
            </table>
          
      </div>
    </>
  );
};
export default ViewFeedback;