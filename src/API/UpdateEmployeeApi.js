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
			name:newEmployee.name,
			gender: newEmployee.gender,
			dateOfBirth: newEmployee.dateOfBirth,
			education: newEmployee.education,
			email: newEmployee.email,
			joiningDate:newEmployee.joiningDate,
			designation : newEmployee.designation,
			address : newEmployee.address,
			phoneNumber : newEmployee.phoneNumber,
			salary: newEmployee.salary,
			permanentDate: newEmployee.permanentDate,
			status:newEmployee.status,
			appointmentLetterStatus:newEmployee.appointmentLetterStatus==='true',
			agreementSignStatus: newEmployee.agreementSignStatus==='true',
			linkedInProfile:newEmployee.linkedInProfile,
			personalEmail:newEmployee.personalEmail,
			cnic:newEmployee.cnic,
			employee_No:newEmployee.employee_No 
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
