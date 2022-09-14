import axios from "axios";
import { useParams } from "react-router-dom";

class UserManagment {
    addUser(user) {
        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/user`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: user.name,
                    id: user.user,
                    password: user.password,
                    email: user.email,
                    type: user.type,
                    picture: user.picture
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
    }

    updateUser(user) {
        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/api/v1/user`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: user.name,
                    id: user.user,
                    password: user.password,
                    email: user.email,
                    type: user.type,
                    picture: user.picture
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
    }

    getUsers() {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/user`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {},
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
    }

    deleteUser(user) {
        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/api/v1/user/${user.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {},
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
    }



    addRole(role) {
        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/role`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: role.name,
                    description: role.description,
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
    }

    updateRole(role) {

        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/api/v1/role/${role.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    name: role.name,
                    description: role.description,
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
    }




    deleteRole(role) {
        return axios({
                method: "delete",
                url: `https://dbhrmbee.herokuapp.com/api/v1/role/${role.id}`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {},
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
    }

    getRoles() {

        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/role`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {},
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
    }

    addPermission(permission) {
        return axios({
                method: "post",
                url: `https://dbhrmbee.herokuapp.com/api/v1/permission`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    roleIds: permission.roles,
                    userId: permission.user,
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
    }

    updatePermission(permission) {
        return axios({
                method: "patch",
                url: `https://dbhrmbee.herokuapp.com/api/v1/permission`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {
                    roleIds: permission.roles,
                    userId: permission.user,
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
    }

    getPermission() {
        return axios({
                method: "get",
                url: `https://dbhrmbee.herokuapp.com/api/v1/permission`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    mode: "no-cors",
                },
                data: {},
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
    }
}

export let userManagmentRequests = new UserManagment();