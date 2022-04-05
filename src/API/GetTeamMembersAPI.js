import axios from 'axios';

export const getTeamMembersApi = async (teamId) => {
	 return axios({
		method: 'get',
		url: `http://localhost:4000/api/v1/teams-member/${teamId}`,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
			mode: "no-cors"
		},
	})
		.then((result) => {
			return {
				error: false,
				data:result.data
			};
		})
		.catch((err) => {
			return {
				error: true,
				data:err
			};
		});

}
