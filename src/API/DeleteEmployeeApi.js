import axios from 'axios';

export const deleteEmployeeApi = async (id) => {
	debugger;
	return axios({
		method: 'delete',
		url: `http://localhost:4000/api/v1/employees/${id}`,
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