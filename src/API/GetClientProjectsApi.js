import axios from 'axios';

export const GetClientProjectsApi = async (clientId) => {
	 return axios({
		method: 'get',
		url: `http://localhost:4000/api/v1/client/projects/${clientId}`,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		},
	})
		.then((result) => {
			return {
				error: false,
				data:result.data
			};
		})
		.catch((err) => {
			return {
				error: true,
				data:err
			};
		});

}
