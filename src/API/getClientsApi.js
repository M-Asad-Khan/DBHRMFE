import axios from 'axios';

export const getClientsApi = async () => {
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
