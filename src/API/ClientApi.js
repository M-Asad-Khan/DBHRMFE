import axios from "axios";

class clientApi {
    constructor() {}
    addClientApi = async(client) => {

        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/client`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: client.name,
                    email: client.email,
                    contactNumber: client.contactNumber,
                    technology: client.technology,
                    contactPerson: client.contactPerson,
                    country: client.country,
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

    deleteClientApi = async(id) => {

        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/api/v1/client/${id}`,
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

    getClientsApi = async() => {

        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/client`,
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
    getClientApi = async(id) => {

        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/client/${id}`,
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

    updateClientApi = async(client) => {

        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/api/v1/client/${client.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: client.name,
                    contactPerson: client.contactPerson,
                    email: client.email,
                    contactNumber: client.contactNumber,
                    technology: client.technology,
                    country: client.country,
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

    GetClientProjectsApi = async(clientId) => {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/client/projects/${clientId}`,
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

export let clientRequests = new clientApi();