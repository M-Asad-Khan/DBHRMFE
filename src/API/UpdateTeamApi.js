import axios from "axios";

export const updateTeamApi = async (team) => {
  debugger;
  return axios({
    method: "patch",
    url: `http://localhost:4000/api/v1/teams/${team.id}`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    },
    data: {
      teamName: team.teamName,
      teamLead: team.teamLead,
      startDate: team.startDate,
      clientId: team.clientId,
      manager: team.manager,
      members: team.members,
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
