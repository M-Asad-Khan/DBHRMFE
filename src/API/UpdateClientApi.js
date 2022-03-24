import axios from 'axios';

export const updateClientApi = async ( Client) => {
	debugger;
	return axios({
		method: 'patch',
		url: `http://localhost:4000/api/v1/client/${Client.id}`,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		},
		data: {
			name: Client.name,
			age: Client.age,
			gender: Client.gender,
			dateOfBirth: Client.dateOfBirth,
			education: Client.education,
			email: Client.email,
			joiningDate: Client.joiningDate,
			designation: Client.designation,
			address: Client.address,
			phoneNumber: Client.phoneNumber,
			technology: Client.technology,
			workExperience: Client.workExperience,
			salary: Client.salary
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
