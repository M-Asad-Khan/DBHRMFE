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
        jobTitle: newPosting.jobTitle,
        department: newPosting.department,
        reportsTo: newPosting.reportsTo,
        effectiveDate: newPosting.effectiveDate,
        qualification: newPosting.qualification,
        workExperience:newPosting.workExperience,
        vacantPositions: newPosting.vacantPositions,
        description: newPosting.description,
       
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
  getCandidatesApi = async () => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/jobPosting`,
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

  updateCandidateApi = async (newPosting) => {
    debugger;
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/jobPosting/${newCandidate.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        jobTitle: newPosting.jobTitle,
        department: newPosting.department,
        reportsTo: newPosting.reportsTo,
        effectiveDate: newPosting.effectiveDate,
        qualification: newPosting.qualification,
        workExperience:newPosting.workExperience,
        vacantPositions: newPosting.vacantPositions,
        description: newPosting.description,
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
  deleteCandidateApi = async (id) => {
    debugger;
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/jobPosting/${id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
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
export let jobPostingRequests = new jobPostingApi();