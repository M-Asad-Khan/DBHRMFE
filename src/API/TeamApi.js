import axios from "axios";
class TeamApi {
<<<<<<< Updated upstream
  addTeamApi = async (team) => {
          
=======
  addTeamApi = async (team,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token

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

<<<<<<< Updated upstream
  deleteTeamsApi = async (id) => {
          
=======
  deleteTeamsApi = async (id,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams/${id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token

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

<<<<<<< Updated upstream
  updateTeamApi = async (team) => {
          
=======
  updateTeamApi = async (team,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams/${team.id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token

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

  getTeamsApi = async (token) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token

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
