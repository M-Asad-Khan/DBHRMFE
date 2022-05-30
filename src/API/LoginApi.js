import axios from "axios";
class LoginApi{
<<<<<<< Updated upstream
	loginApi(loginInfo) {
		  
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/login`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        email: loginInfo.email,
        password: loginInfo.password,
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
=======
	async loginApi(loginInfo) {
		debugger;
    try {
      const result = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_LOCAL_PATH}/login`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          mode: "no-cors"
        },
        data: {
          email: loginInfo.email,
          password: loginInfo.password
        }
>>>>>>> Stashed changes
      });
      debugger;
      return {
        error: false,
        data: result.data
      };
    } catch (err) {
      debugger;
      return {
        error: true,
        data: err
      };
    }
	}
}
export let loginRequest = new LoginApi;