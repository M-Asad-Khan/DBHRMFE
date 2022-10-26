import axios from "axios";

class HelpDeskApi {

    addTicketApi = async(ticket) => {
        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeTicket`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: ticket,
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





    getEmployeeTicketsApi = async(id) => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeTicket/${id}`,
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

    getAllTicketsApi = async() => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeTicket`,
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


    addTicketCommentsApi = async(ticketComment) => {
        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeTicketComments`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: ticketComment,
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

    getTicketsCommentApi = async(id) => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/employeeTicketComments/${id}`,
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






    getHiredCandidatesApi = async() => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/candidate/hired`,
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


    updateCandidateApi = async(newCandidate) => {

        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/api/v1/candidate/${newCandidate.id}`,
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
                    positionId: newCandidate.positionId,
                    AppliedDate: newCandidate.AppliedDate,
                    skills: newCandidate.skills,
                    picture: newCandidate.picture,
                    resumelink: newCandidate.resumelink
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
    deleteCandidateApi = async(id) => {

        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/api/v1/candidate/${id}`,
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
export let helpDeskRequests = new HelpDeskApi();