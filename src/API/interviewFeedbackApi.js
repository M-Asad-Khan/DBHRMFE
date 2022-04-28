import axios from "axios";

class interviewFeedbackApi {
  addinterviewFeedbackApi = async (newFeedback) => {
    console.log(newFeedback);
    debugger;
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/interviewFeedback`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        FirstName: newFeedback.FirstName,
        lastName: newFeedback.lastName,
        email: newFeedback.email,
        phoneNumber: newFeedback.phoneNumber,
        gender: newFeedback.gender,
        status: newFeedback.status,
        postAppliedFor: newFeedback.postAppliedFor,
        AppliedDate: newFeedback.AppliedDate,
        skills: newFeedback.skills,
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
}
export let interviewFeedbackRequests = new interviewFeedbackApi();