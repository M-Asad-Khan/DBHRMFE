import axios from 'axios';

export const addTeamApi = async (team) => {
	return axios({
		method: 'post',
		url: 'http://localhost:4000/api/v1/client',
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		},
		data: {
			name: team.name,
			teamLead: team.teamLead,
			startDate: team.startDate,
			clientId: team.clientId,
			manager: team.manager,
			members: team.members,
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
			return {
				error: true,
				data:err
			}
		});
}
