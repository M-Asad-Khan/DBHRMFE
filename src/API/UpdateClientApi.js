import axios from 'axios';

export const updateClientApi = async ( client) => {
	debugger;
	return axios({
		method: 'patch',
		url: `http://localhost:4000/api/v1/client/${client.id}`,
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
			project: client.project,
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
