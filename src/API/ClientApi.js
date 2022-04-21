import axios from 'axios';

export class ClientAPI {
    constructor() {}

    addClientApi = async(client) => {
        return axios({
                method: 'post',
                url: 'http://localhost:4000/api/v1/client',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors"
                },
                data: {
                    name: client.name,
                    gender: client.gender,
                    email: client.email,
                    contactNumber: client.contactNumber,
                    technology: client.technology,
                    country: client.country
                }
            })
            .then((result) => {
                debugger;
                return {
                    error: false,
                    data: result.data
                }
            })
            .catch((err) => {
                debugger;
                return {
                    error: true,
                    data: err
                }
            });
    }

    getClientsApi = async () => {
        return axios({
            method: 'get',
            url: 'http://localhost:4000/api/v1/client',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                mode: "no-cors"
            },
        })
            .then((result) => {
                return {
                    error: false,
                    data: result.data
                };
            })
            .catch((err) => {
                debugger;
                return {
                    error: true,
                    data: err
                };
            });
        }
        
    
    deleteClientApi = async(id) => {
        debugger;
        return axios({
                method: 'delete',
                url: `http://localhost:4000/api/v1/client/${id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors"
                },
            })
            .then((result) => {
                debugger;
                return {
                    error: false,
                    data: result.data
                }
            })
            .catch((err) => {
                debugger;
                return {
                    error: true,
                    data: err
                }
            });
    }

}

export let clientAPI = new ClientAPI();