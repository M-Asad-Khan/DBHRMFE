import axios from "axios";
import { useParams } from "react-router-dom";

class UserManagment {
  addUser(user) {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/user`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
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

  getUsers() {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/user`,
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
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/role`,
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
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/role/${role.id}`,
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
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/role/${role.id}`,
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
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/role`,
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
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/permission`,
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
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/permission`,
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
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/permission`,
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
