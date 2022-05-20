import axios from "axios";

class clientApi {
    constructor() {}
    addClientApi = async(client) => {
    
        return axios({
                method: "post",
                url: `${process.env.REACT_APP_API_LOCAL_PATH}/client`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: client.name,
                    gender: client.gender,
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

    deleteClientApi = async(id) => {
           
        return axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_LOCAL_PATH}/client/${id}`,
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
                url: `${process.env.REACT_APP_API_LOCAL_PATH}/client`,
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
                url: `${process.env.REACT_APP_API_LOCAL_PATH}/client/${client.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: client.name,
                    gender: client.gender,
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
                url: `${process.env.REACT_APP_API_LOCAL_PATH}/client/projects/${clientId}`,
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