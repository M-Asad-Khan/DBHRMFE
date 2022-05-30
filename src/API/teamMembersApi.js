import axios from "axios";

class TeamMembersApi {
  getTeamMembersApi = async (teamId,token) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams-member/${teamId}`,
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
  deleteTeamMemberApi = async (teamId, memberId) => {
           
=======
  deleteTeamMemberApi = async (teamId, memberId,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams-member`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
      },
      data: {
        teamId: teamId,
        members: [memberId],
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
  addTeamMembersApi = async (team) => {
           
=======
  addTeamMembersApi = async (team,token) => {
    debugger;
>>>>>>> Stashed changes
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_LOCAL_PATH}/teams-member/`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
        "Authorization" : 'Bearer ' + token
      },
      data: {
        teamId: team.id,
        members: team.members,
        clientId: team.clientId,
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
export let teamMembersRequests = new TeamMembersApi();
