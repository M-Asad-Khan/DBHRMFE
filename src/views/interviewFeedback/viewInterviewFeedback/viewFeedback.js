import React, { useEffect, useState } from "react";
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
  let count = 0;
  let feedBackQuestion = hrState.newFeedback;
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState({});
  const [result, setResult] = useState({});
  const handleCancel = () => {
    dispatch(updateIsViewFeedbackClickedAction(false));
    dispatch(updateNewFeedbackAction({}));
    count = 0;
  };


  useEffect(() => {
    const groups = hrState.newFeedback.reduce((groups, item) => {
      const group = (groups[item.interViewer.name] || []);
      group.push(item);
      groups[item.interViewer.name] = group;
      return groups;
    }, {});

    let sumResult = {};

    Object.keys(groups).map((ke, index) => {
      let interviewerQuestions=0;
      sumResult[ke] =Math.floor(count/interviewerQuestions*100);
      count=0;
      groups[ke].map(interview => {
        interviewerQuestions=interviewerQuestions+5;
        count = count + parseInt(interview.rating);
      })
      sumResult[ke] =Math.floor(count/interviewerQuestions*100);
    })
    setResult(sumResult);
    setFeedback(groups);
  }, [hrState.newFeedback])

  const renderList = (key) => {

    const groups = feedback[key].reduce((groups, item) => {
      item.dateOfInterview = new Date(item.dateOfInterview).toLocaleDateString("en-US")
      const group = (groups[item.interViewPhase + "   " + item.dateOfInterview] || []);
      group.push(item);
      groups[item.interViewPhase + "   " + item.dateOfInterview] = group;
      return groups;
    }, {});
    count = 0;
    return (Object.keys(groups).map((ke, index) => (
      groups[ke].map((x, i) => (
        <tbody>
          {
            i == 0 &&
            <tr>
              <td style={{ "fontSize": "20px", "fontWeight": "bold" }}>{ke}</td>
            </tr>

          }
          <tr key={i + index}>
            <td scope="row" className="font-weight-bold">{i + 1}</td>
            <td scope="row">{x.question.question}</td>
            <td>
              {x.rating}
            </td>
            <td>
              {x.comment}
            </td>

          </tr>


        </tbody>
      ))
    )
    ))
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

            </div>
          </div>
        </div>
        {feedBackQuestion.length > 0 ? (
          Object.keys(feedback).map((key, index) => (

            <div>
              <div className="form-card " style={{ height: "auto", margin: "4px 10%" }}>

                <div className="d-flex">
                  <div className="d-flex w-100">
                    <label className=" d-flex font-weight-bold" style={{ color: "dimgrey" }}>
                      Candidate Name:
                    </label>&nbsp;&nbsp;
                    <span >{feedback[key][0]?.candidate?.FirstName}</span>
                  </div>
                  <div className="d-flex w-100 justify-content-end">
                    <label className=" d-flex font-weight-bold" style={{ color: "dimgrey" }}>
                      Interviewer Name:
                    </label>&nbsp;&nbsp;
                    <span >{feedback[key][0]?.interViewer?.name}</span>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex w-100">
                    <label className=" d-flex font-weight-bold" style={{ color: "dimgrey" }}>
                      Date of Interview:
                    </label>&nbsp;&nbsp;
                    <span >{feedback[key][0]?.dateOfInterview?.slice(0, 10)}</span>
                  </div>
                  <div className="d-flex w-100 justify-content-end">
                    <label className=" d-flex font-weight-bold" style={{ color: "dimgrey" }}>
                      Position:
                    </label>&nbsp;&nbsp;
                    <span >{feedback[key][0]?.position?.jobTitle}</span>
                  </div>
                </div>
              </div>
              <table className="table table-hover bg-white">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Job Interview</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Comments</th>
                  </tr>
                </thead>
                {renderList(key)}  
              <tr>
                  <td colSpan="2" className="text-center font-weight-bold">Result</td>
                  <td className=" font-weight-bold">{(result[key])}%</td>
                  <td className=" font-weight-bold">{result[key] > 90 ? " Highly Recommended" : result[key] > 70 ? " Recommended" : " Average"}</td>
                </tr>


              </table>
            </div>
          ))) : ""}
      </div>
    </>
  );
};
export default ViewFeedback;