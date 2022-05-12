import axios from "axios";

class interviewFeedbackApi {
  addinterviewFeedbackApi = async (newFeedback) => {
    console.log(newFeedback);
    debugger;
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/interviewfeedback`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        question: newFeedback.question,
      /*   interViewerId: newFeedback.interViewerId,
        candidateId: newFeedback.candidateId,
        dateOfInterview: newFeedback.dateOfInterview,
        positionId:newFeedback.positionId,
        


        {
          "interViewerId":"89000831-06f3-4d62-b36d-c84908594b58",
          "candidateId":"fbce2d43-dc32-4335-8828-fd814ddaf50d",
          "dateOfInterview":"2022-05-11",
          "positionId":"b120a4e3-1442-4a49-8bb0-d8e248e89791",
          "questionArray":[{"id":"d588ea2b-b2ac-4285-9291-826ca8db6126","rating":"4","comment":"test"},{"id":"ec220834-1018-44f6-a3c3-145c6cc71440","rating":"4","comment":"test"},{"id":"ddbd3eb4-82a8-40e2-bdc8-060fb9ef4fa5","rating":"4","comment":"test comment"},{"id":"4db3c34f-1fb6-4de4-a8d4-4547529d9705","rating":"5","comment":"test good question"},{"id":"f5c4aafa-9980-4290-bea9-57e11bb59da9","rating":"4","comment":"average"}]
      } */
      
      
       
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
  getinterviewFeedbackApi = async () => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/interviewfeedback`,
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


  updateinterviewFeedbackApi = async (newFeedback) => {
    debugger;
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/interviewfeedback/${newFeedback.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        question: newFeedback.question,
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
export let interviewFeedbackRequests = new interviewFeedbackApi();