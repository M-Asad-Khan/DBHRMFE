import axios from "axios";

class jobPostingApi {
  addjobPostingApi = async (newPosting,token) => {
    console.log(newPosting);
         
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/jobPosition`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token

      },
      data: {
        jobTitle: newPosting.jobTitle,
        department: newPosting.department,
        managerId: newPosting.managerId,
        effectiveDate: newPosting.effectiveDate,
        qualification: newPosting.qualification,
        workExperience:newPosting.workExperience,
        vacantPositions: newPosting.vacantPositions,
        description: newPosting.description,
       
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
        console.log("jobPosition Error", error);
        return {
          error: true,
          data: err,
        };
      });
  };
  getjobPostingsApi = async (token) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/jobPosition`,
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
  updatejobPostingApi = async (newPosting) => {
         
=======
  updatejobPostingApi = async (newPosting,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/jobPosition/${newPosting.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token

      },
      data: {
        jobTitle: newPosting.jobTitle,
        department: newPosting.department,
        managerId: newPosting.managerId,
        effectiveDate: newPosting.effectiveDate,
        qualification: newPosting.qualification,
        workExperience:newPosting.workExperience,
        vacantPositions: newPosting.vacantPositions,
        description: newPosting.description,
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
  deletejobPostingApi = async (id) => {
         
=======
  deletejobPostingApi = async (id,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/jobPosition/${id}`,
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
export let jobPostingRequests = new jobPostingApi();