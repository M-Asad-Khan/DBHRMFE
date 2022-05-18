import React, { useState, useEffect } from "react";
import "./viewFeedback.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewFeedbackClickedAction,
  updateNewFeedbackAction,
} from "src/redux/interviewFeedback/interviewFeedback.actions";

import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { RiSettings2Line } from "react-icons/ri";
import {  AiOutlineMail } from "react-icons/ai";
import { BsTelephoneForward, BsGlobe } from "react-icons/bs";
import { interviewFeedbackRequests } from "src/API/interviewFeedbackApi";


import { interviewFeedbackFormRequests } from "src/API/interviewFeedbackFormApi";

const ViewFeedback = () => {
  

  const hrState = useSelector((state) => state.interviewFeedback);
  const [feedBackQuestion, setFeedBackQuestions] = useState();
  const dispatch = useDispatch();


  useEffect(() => {
   
    handleGetInterviewFeedbackApi();
  }, []);

  const handleCancel = () => {
    dispatch(updateIsViewFeedbackClickedAction(false));
    dispatch(updateNewFeedbackAction({}));
  };
  const handleGetInterviewFeedbackApi = async () => {
    try {
      const res = await interviewFeedbackRequests.getinterviewFeedbackApi();
      debugger;
      if (res.error === false) {
      debugger;
        console.log("res.data", res.data);
        setFeedBackQuestions( res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
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

              <div className="form-card">
                <div className="d-flex">
                  <img
                    className="rounded-circle mx-auto"
                    alt="100x100"
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                    data-holder-rendered="true"
                  />
                </div>
                <div className="text-center">
                  <h2>{hrState?.newFeedback[0]?.interViewer?.name}</h2>
                 
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
               {feedBackQuestion &&feedBackQuestion.map((x,i)=>{
                return (
                  <tr key={i}>
                      <td scope="row">{x.question}</td>
                      <td>
                        {/* <RatingAtom
                          onChange={(rate) =>{ handleRating(rate, x.id,i);
                            feedBackQuestionResponse[i].id = x.id;
                            feedBackQuestionResponse[i].rank = rate/20;
                          }}
                          rating={rating[`${i}`]}
                        /> */}
                      </td>
                      <td>
                        <div>
                          <input type="text" onChange={(event)=>{
                             handleComment(event.target.value,i)
                          }}/>
                        </div>
                      </td>
                  </tr>
                )
                })} 
              </tbody>
            </table>
          
      </div>
    </>
  );
};
export default ViewFeedback;