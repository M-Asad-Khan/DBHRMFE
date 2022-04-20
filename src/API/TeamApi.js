import axios from "axios";
class TeamApi {
  addTeamApi = async (team) => {
    debugger;
    return axios({
      method: "post",
      url: "${process.env.REACT_APP_API_LOCAL_PATH}/teams",
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
        project: team.project,
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

  deleteTeamsApi = async (id) => {
    debugger;
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams/${id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
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

  updateTeamApi = async (team) => {
    debugger;
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams/${team.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
      data: {
        teamName: team.teamName,
        teamLead: team.teamLead,
        startDate: team.startDate,
        manager: team.manager,
        project: team.project,
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

  getTeamsApi = async () => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
    })
      .then((result) => {
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
        return {
          error: true,
          data: err,
        };
      });
  };
}

export let teamRequests = new TeamApi();
