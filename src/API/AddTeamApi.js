import axios from 'axios';

export const addTeamApi = async (team) => {
	debugger;
	return axios({
		method: 'post',
		url: 'http://localhost:4000/api/v1/teams',
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		},
		data: {
			teamName: team.teamName,
			teamLead: team.teamLead,
			startDate: team.startDate,
			clientId: team.clientId,
			manager: team.manager,
			members: team.members,
			project:team.project
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
