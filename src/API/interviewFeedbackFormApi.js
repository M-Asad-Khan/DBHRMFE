import axios from "axios";

class interviewFeedbackFormApi {
  addinterviewFeedbackFormApi = async (newFeedback,feedBackQuestionResponse) => {
    console.log(newFeedback);
    debugger;
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/interViewFeedBackResponse`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
       
        interViewerId: newFeedback.intervier,
        candidateId: newFeedback.candidates,
        dateOfInterview: newFeedback.dateOfInterview,
        positionId: newFeedback.position,
        questionArray:feedBackQuestionResponse
       
       
      },
    })
      .then((result) => {
        debugger;
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
        debugger;
        const error = JSON.stringify(err);
        console.log("interviewFeedback Error", error);
        return {
          error: true,
          data: err,
        };
      });
  };
  getinterviewFeedbackFormApi = async () => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/interViewFeedBackResponse`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
    })
      .then((result) => {
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
        return {
          error: true,
          data: err,
        };
      });
  };


  updateinterviewFeedbackFormApi = async (newFeedback,feedBackQuestionResponse) => {
    debugger;
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/interViewFeedBackResponse/${newFeedback.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        
        interViewerId: newFeedback.interViewerId,
        candidateId: newFeedback.candidateId,
        dateOfInterview: newFeedback.dateOfInterview,
        positionId: newFeedback.positionId,
        questionArray:feedBackQuestionResponse
      },
    })
      .then((result) => {
        debugger;
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
        debugger;
        return {
          error: true,
          data: err,
        };
      });
  };


}
export let interviewFeedbackFormRequests = new interviewFeedbackFormApi();