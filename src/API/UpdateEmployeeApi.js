import axios from 'axios';

export const updateEmployeeApi = async ( newEmployee) => {
	debugger;
	return axios({
		method: 'patch',
		url: `http://localhost:4000/api/v1/employees/${newEmployee.id}`,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		},
		data: {
			name: newEmployee.name,
			age: newEmployee.age,
			gender: newEmployee.gender,
			dateOfBirth: newEmployee.dateOfBirth,
			education: newEmployee.education,
			email: newEmployee.email,
			joiningDate: newEmployee.joiningDate,
			designation: newEmployee.designation,
			address: newEmployee.address,
			phoneNumber: newEmployee.phoneNumber,
			technology: newEmployee.technology,
			workExperience: newEmployee.workExperience,
			salary: newEmployee.salary
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
