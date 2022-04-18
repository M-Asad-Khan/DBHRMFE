import axios from 'axios';

export const addEmployeeApi = async (newEmployee) => {
	return axios({
		method: 'post',
		url: 'http://localhost:4000/api/v1/employees',
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
				data:result.data
			}
		})
		.catch((err) => {
			debugger;
			const error = JSON.stringify(err)
			console.log("Employee Error",error)
			return {
				error: true,
				data:err
			}
		});
}
