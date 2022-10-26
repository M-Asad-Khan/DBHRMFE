import axios from "axios";

class jobPostingApi {
    addjobPostingApi = async(newPosting) => {
        console.log(newPosting);

        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/jobPosition`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    jobTitle: newPosting.jobTitle,
                    department: newPosting.department,
                    effectiveDate: newPosting.effectiveDate,
                    qualification: newPosting.qualification,
                    workExperience: newPosting.workExperience,
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
    getjobPostingsApi = async() => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/jobPosition`,
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

    updatejobPostingApi = async(newPosting) => {

        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/api/v1/jobPosition/${newPosting.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    jobTitle: newPosting.jobTitle,
                    department: newPosting.department,
                    effectiveDate: newPosting.effectiveDate,
                    qualification: newPosting.qualification,
                    workExperience: newPosting.workExperience,
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
    deletejobPostingApi = async(id) => {

        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/api/v1/jobPosition/${id}`,
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
}
export let jobPostingRequests = new jobPostingApi();