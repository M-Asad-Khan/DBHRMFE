import axios from 'axios';

export const addEmployeeApi = async (newEmployee) => {
	console.log(newEmployee)
	debugger
	return axios({
		method: 'post',
		url: 'http://localhost:4000/api/v1/employees',
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
			employee_No:newEmployee.employee_No,
			workExperience:newEmployee.workExperience,
			technology:newEmployee.technology,

			
			// name: newEmployee.name,
			// gender: newEmployee.gender,
			// dateOfBirth: newEmployee.dateOfBirth,
			// education: newEmployee.education,
			// email: newEmployee.email,
			// joiningDate: newEmployee.joiningDate,
			// designation: newEmployee.designation,
			// address: newEmployee.address,
			// phoneNumber: newEmployee.phoneNumber,
			// salary: newEmployee.salary,
			// personalEmail:newEmployee.personalEmail,
			// cnic:newEmployee.cnic,
			// permanentDate:newEmployee.permanentDate,
			// linkedInProfile:newEmployee.linkedInProfile,
			// appointmentLetterStatus:newEmployee.appointmentLetterStatus,
			// agreementSignStatus:newEmployee.agreementSignStatus, 
            // employee_No:newEmployee.employee_No,

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
