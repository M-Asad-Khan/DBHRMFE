import React, { useState, useEffect  } from "react";
import {
  updateNewFeedbackAction,
  updateFeedbacksAction,
  updateIsAddFeedbackClickedAction,
  updateIsEditFeedbackClickedAction,
} from "../../../redux/interviewFeedback/interviewFeedback.actions";
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from "../../../API/EmployeeApi";
import { IoArrowBackSharp } from "react-icons/io5";
import { CButton } from "@coreui/react";
import Select from "react-select";
import {  toast } from "react-toastify";
import { interviewFeedbackRequests } from "src/API/interviewFeedbackApi";
import { jobPostingRequests } from "src/API/JobPostingApi";
import { candidateRequests } from "src/API/CandidateApi";
import { interviewFeedbackFormRequests } from "src/API/interviewFeedbackFormApi";
import RatingAtom from "./rating";
const feedBackQuestionResponse = [
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""},
  {id:"",rating:"",comment:""}];
const interviewFeedback = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [postings, setPostings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [feedBackQuestion, setFeedBackQuestions] = useState();
  const hrState = useSelector((state) => state.interviewFeedback);
  

  useEffect(() => {
    handleGetEmployeesApi();
    handleGetJobPostingsApi();
    handleGetCandidatesApi();
    handleGetInterviewFeedbackApi();
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
        console.log("employee", tempArr);
        setEmployees(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetJobPostingsApi = async () => {
    try {
      const res = await jobPostingRequests.getjobPostingsApi();
      debugger;
      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, 
            value: x.jobTitle, label: x.jobTitle };
        });
        console.log("tempArr", tempArr);
        setPostings(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetCandidatesApi = async () => {
    try {
      const res = await candidateRequests.getCandidatesApi();
      debugger;
      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.FirstName + " " +x.lastName, label: x.FirstName + " " +x.lastName };
        });
        console.log("candidates", tempArr);
        setCandidates(tempArr);
      }
    } catch (err) {
      console.log(err);
    }
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
  function handleChange(evt,field) {
 console.log("user id",evt)
    debugger;
    // const value = evt.target ? evt.target.value : evt.value;
    // const name = evt.target ? evt.target.name : evt.field;
    dispatch(
      updateNewFeedbackAction({
        ...hrState.newFeedback,
        [field]: evt.id,
      })
    );
  }
  const handleCancel = () => {
    dispatch(updateNewFeedbackAction({}));
    dispatch(updateIsAddFeedbackClickedAction(false));
    dispatch(updateIsEditFeedbackClickedAction(false));
  };
  const addAndUpdateFeedback = async () => {
    
      if (hrState.isEditFeedbackClicked === true) {
        try {
          debugger;
          const res = await interviewFeedbackFormRequests.updateinterviewFeedbackFormApi(hrState.newFeedback,feedBackQuestionResponse);
          console.log("updateFeedback Response", res);
          debugger;
          if (res.error === false) {
            debugger;
            toast.success("Feedback Updated");
            let temp = hrState.feedbacks.filter(
              (item) => item.id != res.data.id
            );
            dispatch(updateFeedbacksAction([...temp, res.data]));
            dispatch(updateIsAddFeedbackClickedAction(false));
            dispatch(updateIsEditFeedbackClickedAction(false));
          }
          
        } catch (e) {
          toast.error("error");
          debugger;
        }
      } else {
        try {
          debugger;
          const res = await interviewFeedbackFormRequests.addinterviewFeedbackFormApi(hrState.newFeedback,feedBackQuestionResponse);
          console.log("addFeedbackApi Response", res);
          debugger;
          if (res.error === false) {
            debugger;
            toast.success("Feedback Added");
            dispatch(updateFeedbacksAction([...hrState.feedbacks, res.data]));
            dispatch(updateIsAddFeedbackClickedAction(false));
          }
        } catch (e) {
          toast.error("error");
          debugger;
        }
      }
    
  };
/*   const initState = [
    { jobInterviewCriteria: questions, Ranking: rate, Comments: 50 },
  ]; */
  const [rating, setRating] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    8: 0,
    9: 0,
    10: 0,
  }); // initial rating value
  // Catch Rating value
  const handleRating = (rate, id,i) => {
    setRating((prevState) => ({
      ...prevState,
      [i]: rate,
    }));
    // Some logic
  };
  const handleComment = (value,i)=>{
    feedBackQuestionResponse[i].comment = value;
  }
  console.log('asdasdasd',hrState)
  return (
    <div>
      <div className="container-fluid px-1 py-5 mx-auto">
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
                  Interviewer <span className="text-danger"> *</span>
                </label>
                <Select
                    type="text"
                    id="interviewer"
                    name="interviewer"
                    options={employees}
                    onChange={(event)=>{

                      console.log(event)
                      handleChange(event,'intervier');
                    }}
                  ></Select>{" "}
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label">
                  Date of Interview<span className="text-danger"> *</span>
                </label>
                <input
                value={hrState?.newFeedback?.dateOfInterview?.slice(0, 10)}
                  onChange={(event)=>{

                    dispatch(
                      updateNewFeedbackAction({
                        ...hrState.newFeedback,
                        [event.target.name]: event.target.value,
                      })
                    );
                  }}
                  type="date"
                  id="date"
                  name="dateOfInterview"
                  placeholder=""
                  // onblur="validate(4)"
                />
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label">
                  Candidate Name<span className="text-danger"> *</span>
                </label>
                <Select
                    type="text"
                    id="candidates"
                    name="candidates"
                    options={candidates}
                    onChange={(event)=>handleChange(event,'candidates')}
                  />
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">
                  Position<span className="text-danger"> *</span>
                </label>
                <Select
                    type="text"
                    id="position"
                    name="position"
                    options={postings}
                    onChange={(event)=>handleChange(event,'position')}
                  ></Select>{" "}
              </div>
            </div>
            <p>
              <strong>
                Overall how would you rate this individual's performance based
                on your expectations for the role?
              </strong>
            </p>
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
                        <RatingAtom
                          onChange={(rate) =>{ handleRating(rate, x.id,i);
                            feedBackQuestionResponse[i].id = x.id;
                            feedBackQuestionResponse[i].rating = rate/20;
                          }}
                          rating={rating[`${i}`]}
                        />
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
                  type="submit"
                  className="btn-block btn-primary"
                  onClick={() => {
                    addAndUpdateFeedback()
                   // alert(JSON.stringify(feedBackQuestionResponse));
                  }}
                >
                  {hrState.isEditFeedbackClicked
                      ? "Update Feedback"
                      : "Add Feedback"}
                </CButton>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default interviewFeedback;