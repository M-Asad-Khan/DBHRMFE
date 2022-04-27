import axios from "axios";

class candidateApi {
  addCandidateApi = async (newCandidate) => {
    console.log(newCandidate);
    debugger;
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/candidates`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        FirstName: newCandidate.FirstName,
        lastName: newCandidate.lastName,
        email: newCandidate.email,
        phoneNumber: newCandidate.phoneNumber,
        gender: newCandidate.gender,
        status: newCandidate.status,
        postAppliedFor: newCandidate.postAppliedFor,
        AppliedDate: newCandidate.AppliedDate,
        skills: newCandidate.skills,
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
        console.log("Candidate Error", error);
        return {
          error: true,
          data: err,
        };
      });
  };
}
export let candidateRequests = new candidateApi();