import axios from "axios";

class jobPostingApi {
  addjobPostingApi = async (newPosting) => {
    console.log(newPosting);
    debugger;
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/jobPosting`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        FirstName: newPosting.FirstName,
        lastName: newPosting.lastName,
        email: newPosting.email,
        phoneNumber: newPosting.phoneNumber,
        gender: newPosting.gender,
        status: newPosting.status,
        postAppliedFor: newPosting.postAppliedFor,
        AppliedDate: newPosting.AppliedDate,
        skills: newPosting.skills,
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
        console.log("JobPosting Error", error);
        return {
          error: true,
          data: err,
        };
      });
  };
}
export let jobPostingRequests = new jobPostingApi();