import axios from "axios";
class LoginApi{
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
      });
	}
}
export let loginRequest = new LoginApi;