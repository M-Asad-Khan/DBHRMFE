export const getEmployeeApi = async () => {
	return fetch('http://localhost:4000/api/v1/employees', {
		method: 'GET',
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		}
	}).then((response) => {
		debugger 
		response.json()
	}).catch((e) => {
		debugger
	})
}
