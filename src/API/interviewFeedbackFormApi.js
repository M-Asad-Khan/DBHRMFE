import axios from "axios";

class interviewFeedbackFormApi {
    addinterviewFeedbackFormApi = async(newFeedback, feedBackQuestionResponse) => {
        console.log(newFeedback);
        debugger

        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/interViewFeedBackResponse`,
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
                    interViewPhase: newFeedback.interViewPhase,
                    questionArray: feedBackQuestionResponse


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
                console.log("interviewFeedback Error", error);
                return {
                    error: true,
                    data: err,
                };
            });
    };
    getinterviewFeedbackFormApi = async() => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/interViewFeedBackResponse`,
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
    getOneByIdApi = async(id) => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/interViewFeedBackResponse/${id}`,
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


    updateinterviewFeedbackFormApi = async(newFeedback, feedBackQuestionResponse) => {

        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/interViewFeedBackResponse/${newFeedback.id}`,
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
                    interViewPhase: newFeedback.interViewPhase,
                    questionArray: feedBackQuestionResponse
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
export let interviewFeedbackFormRequests = new interviewFeedbackFormApi();