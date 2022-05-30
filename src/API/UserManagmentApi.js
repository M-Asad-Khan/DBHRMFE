import axios from "axios";
import { useParams } from "react-router-dom";

class UserManagement {
  async addUser(user,token) {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/user`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
      },
			data: {
				name:user.name,
        id: user.user,
        password: user.password,
        email: user.email,
        type: user.type,
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

  async getUsers(token) {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/user`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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

 async addRole(role) {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/role`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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
	
<<<<<<< Updated upstream
	updateRole(role) {
		       
=======
async updateRole(role) {
		debugger;
>>>>>>> Stashed changes
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/role/${role.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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

async deleteRole(role) {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/role/${role.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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

<<<<<<< Updated upstream
  getRoles() {
           
=======
async getRoles() {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/role`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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

async  addPermission(permission) {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/permission`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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
	
async updatePermission(permission) {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/permission`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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

async getPermission() {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/permission`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
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

export let userManagementRequests = new UserManagement();
