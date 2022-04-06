import axios from "axios";

export const addTeamMembersApi = async (team) => {
  debugger;
  return axios({
    method: "post",
    url: `http://localhost:4000/api/v1/teams-member/`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    },
    data: {
      teamId: team.id,
      members: team.members,
      clientId: team.clientId,
    },
  })
    .then((result) => {
      debugger;
      return {
        error: false,
        data: result.data,
      };
    })
    .catch((err) => {
      debugger;
      return {
        error: true,
        data: err,
      };
    });
};
