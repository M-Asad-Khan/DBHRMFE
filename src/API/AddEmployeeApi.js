export const addEmployeeApi = async (newEmployee) => {
	return fetch('http://localhost:4000/api/v1/employees', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		},
		body: JSON.stringify({
			name: `${newEmployee.fName} ${newEmployee.lName}`,
			age: newEmployee.age,
			gender: 'male',
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
		}),
	})
}
