import axios from "axios";

class CandidateApi {
  addCandidateApi = async (newCandidate,token) => {
    console.log(newCandidate);
      
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/candidate`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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
          
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
          
        const error = JSON.stringify(err);
        console.log("Candidate Error", error);
        return {
          error: true,
          data: err,
        };
      });
  };
  getCandidatesApi = async (token) => {
   
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/candidate`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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

<<<<<<< Updated upstream
  updateCandidateApi = async (newCandidate) => {
      
=======
  updateCandidateApi = async (newCandidate,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/candidate/${newCandidate.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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
<<<<<<< Updated upstream
  deleteCandidateApi = async (id) => {
      
=======
  deleteCandidateApi = async (id,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/candidate/${id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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
}
export let candidateRequests = new CandidateApi();