import axios from 'axios';

export const deleteTeamMemberApi = async (teamId,memberId) => {
	debugger;
	return axios({
		method: 'delete',
		url: `http://localhost:4000/api/v1/teams-member`,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		},
		data: {
			teamId: teamId,
			members: [memberId],
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